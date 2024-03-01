<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
    <nav class="bg-gray-300 flex flex-col">
        <RouterLink
            to="/server"
            class="border-b-2 text-center hover:bg-gray-400"
            >Home</RouterLink
        >
        <RouterLink
            to="/dashboard"
            class="border-b-2 text-center hover:bg-gray-400"
            >Dashboard</RouterLink
        >

        <RouterLink to="/disk" class="border-b-2 text-center hover:bg-gray-400"
            >Disks</RouterLink
        >

        <RouterLink
            to="/process"
            class="border-b-2 text-center hover:bg-gray-400"
            >Processes</RouterLink
        >
    </nav>

    <RouterView />
</template>
