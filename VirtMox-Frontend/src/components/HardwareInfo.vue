<template>
    <h3
        class="text-center text-1xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
    >
        RAM
    </h3>
    <table class="w-full border-seperate table-fixed">
        <tr>
            <th class="border text-center">Total</th>
            <td class="border text-center">
                {{ bytesToMB(data.memory.total) }} MB
            </td>
        </tr>
    </table>
    <h3
        class="text-center text-1xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
    >
        CPU
    </h3>
    <table class="w-full border-seperate table-fixed">
        <tr>
            <th class="border text-center">CPU Model</th>
            <td class="border text-center">{{ data.cpu.model }}</td>
        </tr>
        <tr>
            <th class="border text-center">Physical Cores</th>
            <td class="border text-center">{{ data.cpu.physical_cores }}</td>
        </tr>
        <tr>
            <th class="border text-center">Logical Cores</th>
            <td class="border text-center">{{ data.cpu.logical_cores }}</td>
        </tr>
        <tr>
            <th class="border text-center">Min Speed</th>
            <td class="border text-center">{{ data.cpu.min_speed }} GHz</td>
        </tr>
        <tr>
            <th class="border text-center">Max Speed</th>
            <td class="border text-center">{{ data.cpu.max_speed }} GHz</td>
        </tr>
        <tr>
            <th class="border text-center">Governor</th>
            <td class="border text-center">{{ data.cpu.governor }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
export default {
    name: "HardwareInfo",
    components: {},
    methods: {
        bytesToMB(bytes: number) {
            return Math.round(bytes / 1024 ** 2).toFixed(2)
        }
    },
    data() {
        return {
            data: {
                memory: {
                    total: 0
                },
                cpu: {
                    model: "",
                    physical_cores: 0,
                    logical_cores: 0,
                    min_speed: 0,
                    max_speed: 0,
                    governor: ""
                }
            }
        }
    },
    async mounted() {
        const response = await fetch(`${window.location.origin}/api/hardware`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        })

        if (response.ok) {
            console.log("HardwareInfo response ok")
            const data = await response.json()

            this.data = data
        } else {
            console.error("Failed to fetch hardware data")
        }
    }
}
</script>
