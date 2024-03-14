import { Elysia } from "elysia"
import {
    getCpuCoreStats,
    getCurrentCPULoad,
    getMemoryUsage,
    getNetworkActivity
} from "../controller/hardwareController"
import { getProcessList } from "../controller/softwareController"
import { $ } from "bun"

let file_writers = new Map()

export default new Elysia()

    // .ws("/vm", {
    //     open(ws) {
    //         console.log(`WebSocket(VM) opened from ${ws.remoteAddress}`)
    //     },
    //     close(ws, code, message) {
    //         file_writers.delete(ws.id)
    //     },
    //     async message(ws, message) {
    //         const { name, chunk } = message

    //         let cw = await $`pwd`.text()
    //         cw = cw.replaceAll("\n", "")

    //         let path = cw + "/vm/iso/" + name

    //         let writer = file_writers.get(ws.id)

    //         if (!writer) {
    //             const file = Bun.file(path)
    //             writer = file.writer()
    //             file_writers.set(ws.id, writer)
    //             console.log("New Writer")
    //         }

    //         writer.write(message)
    //     }
    // })

    .ws("/", {
        open(ws) {
            console.log(`WebSocket opened from ${ws.remoteAddress}`)
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
