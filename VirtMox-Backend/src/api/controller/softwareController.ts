import si from "systeminformation"

export async function getSoftwareInfo() {
    const os_info = await si.osInfo()

    return {
        distro: os_info.distro,
        hostname: os_info.hostname,
        platform: os_info.platform,
        kernel: os_info.kernel,
        arch: os_info.arch,
        uptime: si.time().uptime
    }
}

export async function getProcessList() {
    return await si.processes()
}
