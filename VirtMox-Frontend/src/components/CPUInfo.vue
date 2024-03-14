<template>
    <table class="w-full border-separate">
        <tr v-for="(value, key) in data.cpu" :key="key">
            <th class="border">{{ key }}</th>
            <td class="border">{{ value }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
export default {
    name: "CPUInfo",
    data() {
        return {
            data: []
        }
    },
    async created() {
        const response = await fetch("http://localhost:3000/cpu-details", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            console.log("HardwareInfo response ok")
            const data = await response.json()
            console.log(data)

            this.data = data
        } else {
            console.error("Failed to fetch hardware data")
        }
    }
}
</script>
