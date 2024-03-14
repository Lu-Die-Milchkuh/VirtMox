<template>
    <table class="w-full border-separate table-fixed">
        <thead>
            <tr>
                <th class="w-1/3 font-bold">Core</th>
                <th class="w-1/3 font-bold">Speed</th>
                <th class="w-1/3 font-bold">Temperature</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(core, index) in cores" :key="index">
                <td class="border text-center">{{ index }}</td>
                <td class="border text-center">{{ core.speed }} GHz</td>
                <td class="border text-center">{{ core.temperature }}°C</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="js">
export default {
    name: "CPUCoreInfo",
    data() {
        return {
            cores: []
        }
    },
    mounted() {
        const ws_url = "ws://" + window.location.hostname + ":3000"
        const ws = new WebSocket(ws_url)

        ws.onopen = () => {
            console.log("Connected to the WS server")

            setInterval(() => {
                ws.send("cpu_core")
            }, 1000)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            const speed = data.speed
            const temperature = data.temperature

            this.cores = speed.cores.map((speed, index) => ({
                speed,
                temperature: temperature.cores[index] || "N/A"
            }))
        }
    }
}
</script>
