import si from "systeminformation"

export async function getHardwareInfo() {
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
