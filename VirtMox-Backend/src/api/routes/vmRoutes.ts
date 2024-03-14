import { Elysia, t } from "elysia"
import {
    getISO,
    createHDD,
    getVmConfigs,
    uploadISO,
    createVM
} from "../controller/vmController"

export default new Elysia()
    .post("/create-hdd", createHDD)
    .post("/upload-iso", uploadISO)
    .get("/vm", getVmConfigs)
    .get("/iso", getISO)
    .post("/vm", createVM)
