<template>
    <table class="relative w-full">
        <thead>
            <tr>
                <th>Partition</th>
                <th>Filesystem</th>
                <th>Mount Point</th>
                <th>Used (GB)</th>
                <th>Size (GB)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="partition in partitions">
                <td class="text-center border">{{ partition.fs }}</td>
                <td class="text-center border">{{ partition.type }}</td>
                <td class="text-center border">{{ partition.mount }}</td>
                <td class="text-center border">
                    {{ (partition.used / 1024 ** 3).toFixed(2) }}
                </td>
                <td class="text-center border">
                    {{ (partition.size / 1024 ** 3).toFixed(2) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { ref, inject } from "vue"

export default {
    name: "PartitionView",
    setup() {
        const partitions = inject("fetchedPartitions", [])

        return {
            partitions
        }
    },
    mounted() {}
}
</script>
