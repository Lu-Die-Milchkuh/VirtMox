<template>
    <main class="overflow-y-scroll">
        <h1
            class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            Process List
        </h1>

        <table class="w-full table-fixed">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(process, index) in processes.list" :key="index">
                    <td
                        class="border text-center text-balance"
                        v-for="header in headers"
                        :key="header"
                    >
                        {{ process[header] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script lang="ts">
export default {
    name: "ProcessView",
    data() {
        return {
            processes: [],
            headers: [
                "pid",
                "user",
                "priority",
                "nice",
                "memVsz",
                "memRss",
                "cpu",
                "mem",
                "started",
                "command"
            ]
        }
    },
    mounted() {
        const ws = new WebSocket("ws://localhost:3000")

        ws.onopen = () => {
            console.log("Connected to process-details")

            setInterval(() => {
                ws.send("process")
            }, 1000)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            //console.log(data)
            this.processes = data
        }
    }
}
</script>
