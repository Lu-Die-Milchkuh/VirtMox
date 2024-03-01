<template>
    <table ref="core_table" class="w-full border-separate table-fixed">
        <tr>
            <th class="w-1/3 font-bold">Core</th>
            <th class="w-1/3 font-bold">Speed</th>
            <th class="w-1/3 font-bold">Temperature</th>
        </tr>
    </table>
</template>

<script lang="ts">
export default {
    name: "TemperatureMonitor",
    components: {},
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
            //console.log(data)

            const speed = data.speed
            const temperature = data.temperature

            const core_table = this.$refs.core_table as HTMLTableElement

            while (core_table.rows.length > 1) {
                core_table.deleteRow(1)
            }

            for (let i = 0; i < speed.cores.length; i++) {
                const core = speed.cores[i]
                const core_temperature = temperature.cores[i]

                const row = core_table.insertRow(-1)

                const core_cell = row.insertCell(0)
                const speed_cell = row.insertCell(1)
                const temperature_cell = row.insertCell(2)

                //core_cell.classList.add("text-center border")
                //speed_cell.classList.add("text-center border")
                //temperature_cell.classList.add("text-center border")

                core_cell.innerHTML = i + ""
                speed_cell.innerHTML = core + " GHz"
                temperature_cell.innerHTML = core_temperature
                    ? core_temperature + "°C"
                    : "N/A"
            }
        }
    }
}
</script>
