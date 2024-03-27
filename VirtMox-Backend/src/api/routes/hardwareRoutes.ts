import { Elysia } from "elysia"
import { auth } from "../auth/AuthMiddleware"

import {
    getCPUInfo,
    getDiskLayout,
    getHardwareInfo
} from "../controller/hardwareController"

export default new Elysia().group("/api", { beforeHandle: auth }, (app) =>
    app
        .get("/hardware", getHardwareInfo)
        .get("/cpu-details", getCPUInfo)
        .get("/disk-layout", getDiskLayout)
)
