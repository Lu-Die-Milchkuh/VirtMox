import toml from "toml"
import json2toml from "json2toml"
import { $ } from "bun"
import { readdir } from "node:fs/promises"

const file_writers = new Map()

// the current working directory
const cw = (await $`pwd`.text()).replace("\n", "")

// Bun currently has no way to read a toml file and convert it into json
// Technically it works via "import data from foo.toml" but this cant
// be used in a loop
async function tomlToJson(file_path: string) {
    return toml.parse(await Bun.file(file_path).text())
}

// Returns an array containing the configuration of each VM
export async function getVmConfigs() {
    const vm_path = "/vm/config/"
    const files = await readdir(`${cw}${vm_path}`)

    let configs = []

    for (let file of files) {
        file = cw + vm_path + file
        let config = await tomlToJson(file)
        configs.push(config)
    }

    return configs
}

// Load the specific VM config for the given name
async function getVMConfig(vm_name) {
    const vm_path = "/vm/config/"

    let file_path = cw + vm_path + vm_name + ".toml"
    let config = await tomlToJson(file_path)

    return config
}

// Creates a virtual harddisk using qemu-img
async function createHDD(name, size) {
    if (!name || !size) {
        return
    }

    let hdd_path = "/vm/hdd/"
    let full_path = cw + hdd_path + name + ".qcow2"

    await $`qemu-img create -f qcow2 ${full_path} ${size}G`

    return full_path
}

// Upload the ISOs to the "ISO" folder, for quick access
export async function uploadISO(ctx) {
    const { title, chunk } = ctx.body
    const file_name = cw + "/vm/iso/" + title

    let writer = file_writers.get(title)

    if (!writer) {
        const file = Bun.file(file_name)
        writer = file.writer()
        file_writers.set(title, writer)
    }

    const bytes = await chunk.arrayBuffer()
    writer.write(bytes)
    writer.flush()
}

// Get the list of ISOs in the "ISO" folder
export async function getISO() {
    const iso_path = "/vm/iso/"
    let iso_list = await readdir(`${cw}${iso_path}`)

    iso_list = iso_list.filter((iso) => iso.endsWith(".iso"))

    return iso_list
}

// Creates a new VM using the given configuration
export async function createVM(ctx) {
    let request = ctx.body

    let config = {
        name: request.name,
        system: {
            command: "qemu-system-x86_64",
            bios: request.firmware
        },
        cpu: {
            count: request.cores
        },
        memory: {
            count: request.memory
        },
        vga: {
            type: request.gpu
        },
        disks: [],
        cdrom: [
            {
                path: request.iso
            }
        ]
    }

    for (let i = 0; i < request.disks.length; i++) {
        let disk = request.disks[i]
        let path = await createHDD(disk.name, disk.size)

        config.disks.push({
            path: path
        })
    }

    let toml = json2toml(config, { newlineAfterSection: true })

    let config_name = cw + "/vm/config/" + config.name + ".toml"
    await Bun.write(config_name, toml)
}

export async function startVM(ctx) {
    const { name } = ctx.body

    const config = await getVMConfig(name)

    console.log(config)

    let command = ""

    command = command.concat(config.system.command, " ")

    console.log(command)

    // command -cdrom iso -hda hdd -m memory -enable-kvm
}

export async function stopVM() {}
