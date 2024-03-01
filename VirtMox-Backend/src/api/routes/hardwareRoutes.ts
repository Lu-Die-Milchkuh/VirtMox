import { Elysia } from "elysia"

import { getCPUInfo, getHardwareInfo } from "../controller/hardwareController"

export default new Elysia()
    .get("/hardware", getHardwareInfo)
    .get("/cpu-details", getCPUInfo())
