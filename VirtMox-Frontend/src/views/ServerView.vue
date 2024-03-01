<script setup lang="ts">
import SoftwareInfo from "../components/SoftwareInfo.vue"
import HardwareInfo from "../components/HardwareInfo.vue"
</script>

<template>
    <main class="overflow-y-scroll">
        <h2
            class="text-center text-2xl font-bold text-balance text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            Software Overview
        </h2>
        <Suspense>
            <SoftwareInfo />
        </Suspense>
        <h2
            class="text-center text-2xl font-bold text-balance text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            Hardware Overview
        </h2>
        <Suspense>
            <HardwareInfo />
        </Suspense>
    </main>
</template>
