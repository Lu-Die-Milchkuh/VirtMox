import { Elysia, t } from "elysia"
import {
    getISO,
    getVmConfigs,
    uploadISO,
    createVM,
    startVM
} from "../controller/vmController"

export default new Elysia()
    .post("/api/upload-iso", uploadISO)
    .get("/api/vm", getVmConfigs)
    .get("/api/iso", getISO)
    .post("/api/vm", createVM)
    .post("/api/start", startVM)
