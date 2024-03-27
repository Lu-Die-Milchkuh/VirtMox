import si from "systeminformation"

export async function getHardwareInfo() {
    // console.log("here")
    const cpu = await si.cpu()
    const memory = await si.mem()

    return {
        cpu: {
            model: cpu.brand,
            physical_cores: cpu.physicalCores,
            logical_cores: cpu.cores,
            min_speed: cpu.speedMin,
            max_speed: cpu.speedMax,
            governor: cpu.governor
        },
        memory: {
            total: memory.total
        }
    }
}

export async function getCPUInfo() {
    const cpu = await si.cpu()
    const cpu_flags = await si.cpuFlags()

    return {
        cpu: cpu,
        cpu_flags: cpu_flags
    }
}

// Returns the current average CPU load in percent
export async function getCurrentCPULoad() {
    const cpu = await si.currentLoad()
    let percentage = cpu.currentLoad.toFixed(2)

    return {
        percentage: percentage
    }
}

// Returns the current memroy usage in percent
export async function getMemoryUsage() {
    const memory = await si.mem()
    let percentage = (memory.active / memory.total) * 100

    percentage = percentage.toFixed(2)

    return {
        percentage: percentage
    }
}

export async function getNetworkActivity() {
    const network = await si.networkStats()

    return {
        network: network
    }
}

export async function getCpuCoreStats() {
    const speed = await si.cpuCurrentSpeed()
    const temperature = await si.cpuTemperature()

    return {
        speed: speed,
        temperature: temperature
    }
}

export async function getDiskLayout() {
    // Physical Disks
    const diskLayout = await si.diskLayout()
    const disks = []
    for (let i = 0; i < diskLayout.length; i++) {
        const disk = diskLayout[i]
        const fileSystem = await si.fsSize(disk.device)
        const partitions = []

        for (let j = 0; j < fileSystem.length; j++) {
            const partition = fileSystem[j]
            partitions.push({
                fs: partition.fs,
                type: partition.type,
                size: partition.size,
                used: partition.used,
                mount: partition.mount
            })
        }
        disks.push({
            device: disk.device,
            name: disk.name,
            size: disk.size,
            partitions: partitions
        })
    }
    return {
        disks: disks
    }
}

export async function getMemoryUsageDetails() {
    const mem = await si.mem()

    return mem
}
