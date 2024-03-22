import { Elysia } from "elysia"
import { login } from "../controller/loginController"

export default new Elysia().post("/api/login", login)
