<template>
    <nav class="relative bg-gray-300 flex flex-col">
        <RouterLink
            to="/web/server"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/server' }"
            >Home</RouterLink
        >

        <RouterLink
            to="/web/dashboard"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{
                'bg-indigo-500 text-white': $route.path === '/dashboard'
            }"
            >Dashboard</RouterLink
        >

        <RouterLink
            to="/web/disk"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/disk' }"
            >Disks</RouterLink
        >

        <RouterLink
            to="/web/process"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/process' }"
            >Processes</RouterLink
        >

        <RouterLink
            to="/web/vm"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/vm' }"
            >Virtual Machine</RouterLink
        >

        <button
            v-if="loggedIn()"
            class="absolute bottom-0 w-full bg-indigo-500 text-white hover:bg-indigo-400"
            @click="logout"
        >
            Logout
        </button>
    </nav>
</template>

<script lang="ts">
import { RouterLink } from "vue-router"

export default {
    name: "Navbar",
    components: {
        RouterLink
    },
    methods: {
        logout() {
            sessionStorage.clear()
            this.$router.push({ name: "home" })
        },
        loggedIn() {
            return sessionStorage.getItem("loggedin")
        }
    }
}
</script>
