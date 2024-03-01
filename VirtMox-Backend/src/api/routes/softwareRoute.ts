import { Elysia } from "elysia"
import { getSoftwareInfo } from "../controller/softwareController"

export default new Elysia().get("/software", getSoftwareInfo)
