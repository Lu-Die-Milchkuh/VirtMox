<template>
    <table class="w-full border-separate">
        <tr>
            <th class="border">Manufacturer</th>
            <td class="border">{{ data.cpu.manufacturer }}</td>
        </tr>
        <tr>
            <th class="border">Brand</th>
            <td class="border">{{ data.cpu.brand }}</td>
        </tr>
        <tr>
            <th class="border">Vendor</th>
            <td class="border">{{ data.cpu.vendor }}</td>
        </tr>
        <tr>
            <th class="border">Family</th>
            <td class="border">{{ data.cpu.family }}</td>
        </tr>
        <tr>
            <th class="border">Model</th>
            <td class="border">{{ data.cpu.model }}</td>
        </tr>
        <tr>
            <th class="border">Stepping</th>
            <td class="border">{{ data.cpu.stepping }}</td>
        </tr>
        <tr>
            <th class="border">Revision</th>
            <td class="border">{{ data.cpu.revision }}</td>
        </tr>
        <tr>
            <th class="border">Min Speed</th>
            <td class="border">{{ data.cpu.speedMin }} GHz</td>
        </tr>
        <tr>
            <th class="border">Max Speed</th>
            <td class="border">{{ data.cpu.speedMax }} GHz</td>
        </tr>

        <tr>
            <th class="border">Physical Cores</th>
            <td class="border">{{ data.cpu.physicalCores }}</td>
        </tr>
        <tr>
            <th class="border">Logical Cores</th>
            <td class="border">{{ data.cpu.cores }}</td>
        </tr>
        <tr>
            <th class="border">Performance Cores</th>
            <td class="border">{{ data.cpu.performanceCores }}</td>
        </tr>
        <tr>
            <th class="border">Efficency Cores</th>
            <td class="border">{{ data.cpu.efficiencyCores }}</td>
        </tr>
        <tr>
            <th class="border">Processors</th>
            <td class="border">{{ data.cpu.processors }}</td>
        </tr>
        <tr>
            <th class="border">Socket</th>
            <td class="border">{{ data.cpu.socket }}</td>
        </tr>
        <tr>
            <th class="border">Flags</th>
            <td class="border">{{ data.cpu.flags }}</td>
        </tr>
        <tr>
            <th class="border">Virtualization</th>
            <td class="border">{{ data.cpu.virtualization }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
export default {
    name: "CPUInfo",
    components: {},
    async setup() {
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
            return { data }
        } else {
            console.error("Failed to fetch hardware data")
        }
    }
}
</script>
