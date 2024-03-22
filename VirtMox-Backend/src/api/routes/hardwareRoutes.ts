import { Elysia } from "elysia"

import {
    getCPUInfo,
    getDiskLayout,
    getHardwareInfo
} from "../controller/hardwareController"

export default new Elysia()
    .get("/api/hardware", getHardwareInfo)
    .get("/api/cpu-details", getCPUInfo())
    .get("/api/disk-layout", getDiskLayout())
