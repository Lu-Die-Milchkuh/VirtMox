<template>
    <table class="w-full border-separate">
        <tr v-for="(value, key) in data.cpu" :key="key">
            <th class="border">{{ key }}</th>
            <td class="border">{{ value }}</td>
        </tr>
    </table>
</template>

<script lang="js">
export default {
    name: "CPUInfo",
    data() {
        return {
            data: []
        }
    },
    async mounted() {
        try {
            const response = await fetch(`${window.location.origin}/api/cpu-details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            })

            if (response.ok) {
                console.log("HardwareInfo response ok")
                const data = await response.json()

                this.data = data
            } else {
                console.error("Failed to fetch hardware data")
            }
        } catch(error) {
            alert("Failed to fetch hardware data")
            console.log(error)
        }

    }
}
</script>
