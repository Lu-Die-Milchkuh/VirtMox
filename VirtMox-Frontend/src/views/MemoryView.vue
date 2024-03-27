<template>
    <main class="grid grid-cols-2 grid-rows-1 w-full">
        <div class="relative border">
            <h2
                class="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                Memory Usage
            </h2>
            <div class="relative h-[90%]">
                <Doughnut
                    :data="memoryChartData"
                    :options="memoryChartOptions"
                />
            </div>
        </div>

        <div class="relative border">
            <h2
                class="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
            >
                Swap Usage
            </h2>
            <div class="relative h-[90%]">
                <Doughnut :data="swapChartData" :options="swapChartOptions" />
            </div>
        </div>
    </main>
</template>

<script lang="js">
import { Doughnut } from "vue-chartjs"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: "MemoryView",
    components: {
        Doughnut,

    },
    data() {
        return {
            memoryChartData: {
                labels: ["Used (GB)", "Free (GB)"],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["#FF6384", "#36A2EB"]
                    }
                ]
            },
            swapChartData: {
                labels: ["Used (GB)", "Free (GB)"],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["#FF6384", "#36A2EB"]
                    }
                ]
            },
            memoryChartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            swapChartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        const ws = new WebSocket("ws://" + window.location.host)

        ws.onopen = () => {
            setInterval(() => {
                ws.send("memory-details")
            }, 1000)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            this.memoryChartData = {
                labels: ["Used (GB)", "Free (GB)"],
                datasets: [
                    {
                        data: [(data.active / 1024 ** 3), (data.available / 1024 ** 3)],
                        backgroundColor: ["rgb(99 102 241)", "#36A2EB"]
                    }
                ]
            }

            this.swapChartData = {
                labels: ["Used (GB)", "Free (GB)"],
                datasets: [
                    {
                        data: [(data.swapused / 1024 ** 3), (data.swapfree / 1024 ** 3)],
                        backgroundColor: ["rgb(99 102 241)", "#36A2EB"]
                    }
                ]
            }
        }
    },
}
</script>
