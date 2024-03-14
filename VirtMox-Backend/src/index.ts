import { Elysia } from "elysia"
import { staticPlugin } from "@elysiajs/static"
import { cors } from "@elysiajs/cors"
import softwareRoutes from "./api/routes/softwareRoute"
import hardwareRoutes from "./api/routes/hardwareRoutes"
import websocketPlugin from "./api/websocket/websocket"
import vmRoutes from "./api/routes/vmRoutes"

const PORT = Bun.env.PORT || 3000
const app = new Elysia()

app.use(cors())
app.use(staticPlugin({ prefix: "/" }))
app.use(softwareRoutes)
app.use(hardwareRoutes)
app.use(websocketPlugin)
app.use(vmRoutes)

app.listen(PORT, () => {
    console.log(
        `Server is up and running at ${app.server?.hostname}:${app.server?.port}`
    )
})
