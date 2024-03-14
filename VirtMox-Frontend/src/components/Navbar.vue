<template>
    <nav class="bg-gray-300 flex flex-col">
        <RouterLink
            to="/server"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/server' }"
            >Home</RouterLink
        >
        <RouterLink
            to="/dashboard"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{
                'bg-indigo-500 text-white': $route.path === '/dashboard'
            }"
            >Dashboard</RouterLink
        >

        <RouterLink
            to="/disk"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/disk' }"
            >Disks</RouterLink
        >

        <RouterLink
            to="/process"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/process' }"
            >Processes</RouterLink
        >

        <RouterLink
            to="/vm"
            class="border-b-2 text-center hover:bg-gray-400 hover:rounded-xl"
            :class="{ 'bg-indigo-500 text-white': $route.path === '/vm' }"
            >Virtual Machine</RouterLink
        >
    </nav>
</template>

<script lang="ts">
import { RouterLink } from "vue-router"

export default {
    name: "Navbar",
    components: {
        RouterLink
    }
}
</script>
