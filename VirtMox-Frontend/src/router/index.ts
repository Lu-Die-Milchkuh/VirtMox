import { createRouter, createWebHistory } from "vue-router"
import LoginView from "../views/LoginView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: LoginView
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import("../views/DashboardView.vue")
        },
        {
            path: "/server",
            name: "server",
            component: () => import("../views/ServerView.vue")
        },
        {
            path: "/cpu-details",
            name: "cpu-details",
            component: () => import("../views/CPUView.vue")
        },
        {
            path: "/disk",
            name: "disk",
            component: () => import("../views/DiskView.vue")
        },
        {
            path: "/process",
            name: "process",
            component: () => import("../views/ProcessView.vue")
        },
        {
            path: "/vm",
            name: "vm",
            component: () => import("../views/VMOverviewView.vue")
        }
    ]
})

router.beforeEach((to, from) => {
    return true
    //return { name: "home" }
})

export default router
