<template>
    <div class="flex flex-col gap-2 bg-gray-100 rounded-xl">
        <ul class="bg-gray-200 h-16 overflow-y-scroll rounded-t-xl">
            <li
                class="hover:cursor-default border w-fit rounded-xl m-1 bg-gray-300 text-indigo-500 border-indigo-500 p-1"
            >
                Disk 1
            </li>
            <li class="border w-fit rounded m-1">Disk 1</li>
            <li class="border w-fit rounded m-1">Disk 1</li>
            <li class="border w-fit rounded m-1">Disk 1</li>
        </ul>

        <div class="flex gap-5">
            <div>
                <p class="border-b text-xs">Name</p>
                <input class="border" type="text" />
            </div>

            <div>
                <p class="border-b text-xs">Size</p>
                <input class="border" type="number" @keypress="isNumber" />
            </div>
        </div>

        <div class="flex justify-end">
            <button
                class="bg-indigo-500 hover:bg-indigo-400 text-white p-1 rounded-xl"
            >
                Add Disk
            </button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "DiskCreator",
    methods: {
        isNumber(event: KeyboardEvent) {
            const keyValue = event.key
            if (!/[0-9.]/.test(keyValue)) {
                event.preventDefault()
            }
        }
    }
}
</script>
