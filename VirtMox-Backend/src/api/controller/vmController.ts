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

    // console.log(configs)

    return configs
}

// Load the specific VM config for the given name
async function getVMConfig(vm_name) {
    const vm_path = "/vm/config/"

    let file_path = cw + vm_path + vm_name + ".toml"
    let config = await tomlToJson(file_path)

    console.log(config)

    return config
}

export async function createHDD(ctx) {
    const { vm_name, size } = ctx.body

    if (!vm_name || !size) {
        ctx.set.status = 401
        return {
            success: false,
            message: "Some properties are missing"
        }
    }

    let hdd_path = "/vm/hdd/"

    let vm_config = await getVMConfig(vm_name)

    let hdd_count = vm_config.disks.length + 1
    hdd_path = cw + hdd_path + vm_name + hdd_count + ".qcow2"

    console.log(vm_config)

    const foo = await $`qemu-img create -f qcow2 ${hdd_path} ${size}G`.text()

    console.log(foo)
}

// Upload the ISOs to the "ISO" folder, for quick access
export async function uploadISO(ctx) {
    // console.log("Upload")
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

    // console.log("File uploaded")
}

async function saveConfig(vm_config) {}

export async function getISO() {
    const iso_path = "/vm/iso/"
    let iso_list = await readdir(`${cw}${iso_path}`)

    iso_list = iso_list.filter((iso) => iso.endsWith(".iso"))

    return iso_list
}

export async function createVM(ctx) {
    // const { name, firmware,, memory, gpu, disks, cdrom } = ctx.body

    // let config = {
    //     name: name,
    //     system: {
    //         command: "cmd",
    //         firmware: firmware
    //     },
    //     memory: {
    //         count: memory.count
    //     },
    //     cpu: {
    //         count: cpu.count
    //     },
    //     network: {
    //         nic: "",
    //         user: ""
    //     },
    //     vga: {
    //         type: gpu
    //     },
    //     cdrom: [{ path: cdrom }],
    //     disks: [{ path: "foo.iso" }, { path: "foo2.iso" }]
    // }
    let config = ctx.body

    let toml = json2toml(config, { newlineAfterSection: true })

    let config_name = cw + "/vm/config/" + config.name + ".toml"
    await Bun.write(config_name, toml)

    console.log(toml)
}
