import { Elysia } from "elysia"
import {
    getCpuCoreStats,
    getCurrentCPULoad,
    getMemoryUsage,
    getNetworkActivity
} from "../controller/hardwareController"
import { getProcessList } from "../controller/softwareController"

export default new Elysia().ws("/", {
    open(ws) {
        console.log(`WebSocket opened from ${ws.remoteAddress}`)
    },
    close(ws) {
        console.log(`WebSocket closed from ${ws.remoteAddress}`)
    },
    async message(ws, message) {
        // const messages = {
        //         "cpu": getCurrentCPULoad,
        //         "memory": getMemoryUsage,
        //         "network": getNetworkActivity,
        //         "cpu_core": v
        //     }

        if (message === "cpu") {
            ws.send(await getCurrentCPULoad())
        }

        if (message === "memory") {
            ws.send(await getMemoryUsage())
        }

        if (message === "disk") {
        }

        if (message === "network") {
            ws.send(await getNetworkActivity())
        }

        if (message == "cpu_core") {
            ws.send(await getCpuCoreStats())
        }

        if (message == "process") {
            ws.send(await getProcessList())
        }
    }
})
