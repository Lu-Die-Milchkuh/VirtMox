<template>
    <table class="w-full border-seperate table-fixed">
        <tr>
            <th class="border text-center">Distro</th>
            <td class="border text-center">{{ data.distro }}</td>
        </tr>
        <tr>
            <th class="border text-center">Hostname</th>
            <td class="border text-center">{{ data.hostname }}</td>
        </tr>
        <tr>
            <th class="border text-center">Platform</th>
            <td class="border text-center">{{ data.platform }}</td>
        </tr>
        <tr>
            <th class="border text-center">Kernel</th>
            <td class="border text-center">{{ data.kernel }}</td>
        </tr>
        <tr>
            <th class="border text-center">Arch</th>
            <td class="border text-center">{{ data.arch }}</td>
        </tr>
        <tr>
            <th class="border text-center">Uptime</th>
            <td class="border text-center">{{ data.uptime }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
export default {
    name: "SoftwareInfo",
    components: {},
    methods: {},

    async setup() {
        // TODO: Change URL
        const response = await fetch("http://localhost:3000/software", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            console.log("SoftwareInfo response ok")
            const data = await response.json()

            return { data }
        } else {
            console.error("Failed to fetch software data")
        }
    }
}
</script>
