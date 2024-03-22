import { createRouter, createWebHashHistory } from "vue-router"
import LoginView from "../views/LoginView.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: LoginView
        },
        {
            path: "/web/dashboard",
            name: "dashboard",
            component: () => import("../views/DashboardView.vue")
        },
        {
            path: "/web/server",
            name: "server",
            component: () => import("../views/ServerView.vue")
        },
        {
            path: "/web/cpu-details",
            name: "cpu-details",
            component: () => import("../views/CPUView.vue")
        },
        {
            path: "/web/disk",
            name: "disk",
            component: () => import("../views/DiskView.vue")
        },
        {
            path: "/web/process",
            name: "process",
            component: () => import("../views/ProcessView.vue")
        },
        {
            path: "/web/vm",
            name: "vm",
            component: () => import("../views/VMOverviewView.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("../views/NotFound.vue")
        }
    ]
})

router.beforeEach((to, from) => {
    if (!sessionStorage.getItem("loggedin") && to.name !== "home") {
        console.log("Not logged in")
        router.push({ name: "home" })
        return false
    }

    if (to.name === "home" && sessionStorage.getItem("loggedin")) {
        router.push({ name: "server" })
        return false
    }

    return true
})

export default router
