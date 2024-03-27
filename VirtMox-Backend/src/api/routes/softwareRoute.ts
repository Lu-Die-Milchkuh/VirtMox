import { Elysia } from "elysia"
import { getSoftwareInfo } from "../controller/softwareController"
import { auth } from "../auth/AuthMiddleware"

export default new Elysia().get("/api/software", getSoftwareInfo, {
    beforeHandle: auth
})
