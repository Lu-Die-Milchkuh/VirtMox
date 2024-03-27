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

<script lang="js">
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
    data() {
        return {
            fetchedDisks: [],
            selectedDiskPartitions: []
        }
    },
    methods: {
        setPartition(partitions) {
            this.selectedDiskPartitions = partitions
        }
    },
    async mounted() {
        try {
            const response = await fetch(`${window.location.origin}/api/disk-layout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            })
            const data = await response.json()

            this.fetchedDisks = data.disks
            this.selectedDiskPartitions = data.disks[0].partitions

        } catch (error) {
            console.error("Error fetching data:", error)
        }
    },
    provide() {
        return {
            fetchedDisks: this.fetchedDisks,
            fetchedPartitions: this.selectedDiskPartitions
        }
    }
}
</script>
