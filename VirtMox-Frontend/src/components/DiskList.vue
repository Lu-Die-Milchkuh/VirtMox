<template>
    <div>
        <ul>
            <li
                :class="[
                    {
                        ' bg-indigo-500 font-bold text-white':
                            selectedDisk === disk
                    },
                    {
                        'bg-indigo-500 font-bold text-white':
                            index === 0 && !selectedDisk
                    }
                ]"
                class="text-center border-b hover:bg-gray-400 hover:rounded-xl hover:cursor-pointer"
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
    props: ["disks"],
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
    },
    mounted() {
        this.selectedDisk = this.disks[0]

    }
}
</script>
