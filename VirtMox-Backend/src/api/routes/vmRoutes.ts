import { Elysia, t } from "elysia"
import {
    getISO,
    getVmConfigs,
    uploadISO,
    createVM,
    startVM
} from "../controller/vmController"
// import { auth } from "../auth/AuthMiddleware"

export default new Elysia().group("/api", (app) =>
    app
        .post("/upload-iso", uploadISO)
        .get("/vm", getVmConfigs)
        .get("/iso", getISO)
        .post("/vm", createVM)
        .post("/start", startVM)
)
