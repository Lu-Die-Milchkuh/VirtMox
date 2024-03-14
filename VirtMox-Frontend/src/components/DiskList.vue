<template>
    <div>
        <ul>
            <li
                :class="[
                    {
                        ' bg-indigo-100 font-bold': selectedDisk === disk
                    },
                    {
                        ' bg-indigo-100 font-bold': index === 0 && !selectedDisk
                    },
                    'text-center border-b hover:bg-indigo-200 hover:cursor-pointer'
                ]"
                class="text-center border-b hover:bg-indigo-200 hover:cursor-pointer"
                v-for="(disk, index) in disks"
                @click="handleDiskClick(disk)"
            >
                {{ disk.name }} - {{ (disk.size / 1024 ** 3).toFixed(2) }} GB
                ({{ disk.device }})
            </li>
        </ul>
    </div>
</template>

<script lang="js">
import { inject, ref } from "vue"

export default {
    setup() {
        const fetchedDisks = inject("fetchedDisks", [])
        return {
            disks: fetchedDisks
        }
    },
    data() {
        return {
            selectedDisk: null
        }
    },

    methods: {
        handleDiskClick(disk) {
            this.selectedDisk = disk
            this.$emit("disk-click", disk.partitions)
        }
    }
}
</script>
