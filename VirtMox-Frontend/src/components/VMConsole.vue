<template>
    <div class="relative grid grid-rows-[5%] grid-cols-1 h-full">
        <div
            class="flex justify-center gap-5 bg-gray-100 border-b-2 border-indigo-500"
        >
            <button
                class="bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400 p-1 w-16"
                @click="startVM"
            >
                Start
            </button>
            <button
                class="bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400 p-1 w-16"
            >
                Reset
            </button>
        </div>
        <div class="flex justify-center items-center relative">
            <div
                class="border h-3/4 w-3/4 shadow-2xl relative flex flex-col justify-center items-center"
            >
                <p
                    class="relative z-10 font-bold text-white text-5xl break-words"
                >
                    VM not running
                </p>
                <div
                    class="absolute top-0 left-0 w-full h-full z-0 bg-black"
                ></div>
                <canvas
                    class="absolute top-0 left-0 w-full h-full z-20"
                ></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "VMConsole",
    methods: {
        startVM() {
            console.log("Starting VM")
            this.$emit("startVM")
        }
    }
}
</script>
