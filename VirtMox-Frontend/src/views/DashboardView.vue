<template>
    <main class="grid grid-cols-2 grid-rows-2 relative">
        <div class="border overflow-y-scroll relative">
            <h2
                class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                CPU Usage
            </h2>
            <CircleChart type="cpu" />
            <ShowMoreButton link="/cpu-details" />
        </div>
        <div class="border overflow-y-scroll relative">
            <h2
                class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                RAM Usage
            </h2>
            <CircleChart type="memory" />
            <ShowMoreButton link="/memory-details" />
        </div>
        <div class="border overflow-y-scroll relative">
            <h2
                class="h-fit text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                Network Activity
            </h2>
            <LineChart />
            <ShowMoreButton link="/network-details" />
        </div>
        <div class="border overflow-y-scroll relative">
            <h2
                class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                Disk Usage
            </h2>
            <CircleChart type="disk" />
            <ShowMoreButton link="/disk" />
        </div>
    </main>
</template>

<script setup lang="ts">
import CircleChart from "@/components/CircleChart.vue"
import ShowMoreButton from "@/components/ShowMoreButton.vue"
import LineChart from "@/components/LineChart.vue"
</script>
