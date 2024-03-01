<template>
    <main class="overflow-y-scroll">
        <h2
            class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            CPU Info
        </h2>
        <Suspense>
            <CPUInfo />
        </Suspense>

        <h2
            class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            Cores
        </h2>
        <Suspense>
            <CPUCoreInfo />
        </Suspense>
    </main>
</template>

<script setup lang="ts">
import CPUInfo from "../components/CPUInfo.vue"
import CPUCoreInfo from "../components/CPUCoreInfo.vue"
</script>
