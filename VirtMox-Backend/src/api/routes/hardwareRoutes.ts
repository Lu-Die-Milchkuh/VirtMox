import { Elysia } from "elysia"

import {
    getCPUInfo,
    getDiskLayout,
    getHardwareInfo
} from "../controller/hardwareController"

export default new Elysia()
    .get("/hardware", getHardwareInfo)
    .get("/cpu-details", getCPUInfo())
    .get("/disk-layout", getDiskLayout())
