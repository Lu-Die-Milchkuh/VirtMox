<template>
    <div class="flex h-1/2 absolute top-1/2 transform -translate-y-1/2 w-full">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Line } from "vue-chartjs"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: "LineChart",
    components: {
        Line
    },
    data() {
        // Initialize labels with values from 0 to 60
        const labels = Array.from({ length: 61 }, (_, i) => i)

        return {
            tx_total: 0,
            rx_total: 0,
            chartData: {
                labels: labels,
                datasets: [
                    {
                        label: "Download (MB/sec)",
                        borderColor: "blue",
                        data: Array(61).fill(null), // Initialize with null
                        fill: false
                    },
                    {
                        label: "Upload (MB/sec)",
                        borderColor: "green",
                        data: Array(61).fill(null), // Initialize with null
                        fill: false
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        tension: 0.4
                    }
                },
                scales: {
                    x: [
                        {
                            type: "realtime",
                            realtime: {
                                duration: 60000,
                                refresh: 1000,
                                delay: 1000,
                                pause: false,
                                ttl: undefined
                            },
                            ticks: {
                                reverse: true
                            }
                        }
                    ],
                    y: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Data"
                            },
                            ticks: {
                                beginAtZero: false, // Set to false to start from 100
                                suggestedMin: 100 // Set the suggested minimum to 100
                            }
                        }
                    ]
                }
            }
        }
    },

    methods: {
        updateChartData(data) {
            let network = data.network

            // Bytes this second
            let tx_this_second = 0
            let rx_this_second = 0

            network.forEach((element: any) => {
                tx_this_second += element.tx_bytes / 1024 ** 2
                rx_this_second += element.rx_bytes / 1024 ** 2
            })

            // Calculate delta
            let tx_delta = 0
            let rx_delta = 0

            if (this.tx_total !== 0 && this.rx_total !== 0) {
                tx_delta = tx_this_second - this.tx_total
                rx_delta = rx_this_second - this.rx_total
            }

            // Update total bytes
            this.tx_total = tx_this_second
            this.rx_total = rx_this_second

            const labels = [...this.chartData.labels]

            // Add new label
            labels.unshift(0)

            // Shift existing labels to the right
            for (let i = 1; i < labels.length; i++) {
                labels[i] = labels[i] + 1
            }

            const rxData = [...this.chartData.datasets[0].data]
            const txData = [...this.chartData.datasets[1].data]

            // Add new data
            rxData.unshift(rx_delta)
            txData.unshift(tx_delta)

            // Shift existing data to the right
            for (let i = 1; i < rxData.length; i++) {
                rxData[i] = this.chartData.datasets[0].data[i - 1]
                txData[i] = this.chartData.datasets[1].data[i - 1]
            }

            // Update chart data
            this.chartData = {
                labels,
                datasets: [
                    { ...this.chartData.datasets[0], data: rxData },
                    { ...this.chartData.datasets[1], data: txData }
                ]
            }

            // Trim excess data
            if (labels.length > 60) {
                this.chartData.labels.pop()
                this.chartData.datasets[0].data.pop()
                this.chartData.datasets[1].data.pop()
            }
        }
    },
    mounted() {
        const ws_url = "ws://" + window.location.hostname + ":3000"
        const ws = new WebSocket(ws_url)

        ws.onopen = () => {
            console.log("Connected to the WS server")

            setInterval(() => {
                ws.send("network")
            }, 1000)
        }

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data)
            this.updateChartData(data)
        }
    }
}
</script>
