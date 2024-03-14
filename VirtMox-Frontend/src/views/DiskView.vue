<template>
    <main class="overflow-y-scroll">
        <h2
            class="text-center text-2xl font-bold text-wrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-40% to-cyan-500 to-60%"
        >
            Disk Info
        </h2>
        <ResizableGrid>
            <template v-slot:left>
                <DiskList :disks="fetchedDisks" @disk-click="setPartition" />
            </template>

            <template v-slot:right>
                <PartitionView :partitions="selectedDiskPartitions" />
            </template>
        </ResizableGrid>
    </main>
</template>

<script lang="ts">
import { ref, provide, onMounted } from "vue"
import ResizableGrid from "../components/ResizableGrid.vue"
import DiskList from "../components/DiskList.vue"
import PartitionView from "./PartitionView.vue"

export default {
    name: "DiskView",
    components: {
        ResizableGrid,
        DiskList,
        PartitionView
    },
    setup() {
        const fetchedDisks = ref([])
        const selectedDiskPartitions = ref([])

        const setPartition = (partitions) => {
            console.log(partitions)
            selectedDiskPartitions.value = partitions
        }

        onMounted(async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/disk-layout"
                )
                const data = await response.json()
                fetchedDisks.value = data.disks

                setPartition(fetchedDisks.value[0].partitions)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        })

        provide("fetchedDisks", fetchedDisks)
        provide("fetchedPartitions", selectedDiskPartitions)

        return {
            fetchedDisks,
            selectedDiskPartitions,
            setPartition
        }
    }
}
</script>
