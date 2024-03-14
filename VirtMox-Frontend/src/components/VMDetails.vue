<template>
    <div class="flex flex-col h-full">
        <div class="relative flex justify-start w-fit">
            <button
                class="border focus:outline-none transition-colors duration-300 rounded-t-xl p-1"
                :class="{
                    'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400':
                        detailsClicked,
                    'hover:border-indigo-400': !detailsClicked
                }"
                @click="handleDetailsClick"
            >
                Details
            </button>

            <button
                class="border focus:outline-none transition-colors duration-300 rounded-t-xl p-1"
                :class="{
                    'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400':
                        consoleClicked,
                    'hover:border-indigo-400': !consoleClicked
                }"
                @click="handleConsoleClick"
            >
                Console
            </button>
        </div>

        <div
            v-if="detailsClicked"
            class="relative border-2 border-indigo-500 flex-grow overflow-y-auto"
        >
            <p>Details Content Here</p>
        </div>

        <div
            v-else-if="consoleClicked"
            class="relative border-2 border-indigo-500 flex-grow overflow-y-auto"
        >
            <p>Console Content Here</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            detailsClicked: true,
            consoleClicked: false
        }
    },
    methods: {
        handleDetailsClick() {
            this.detailsClicked = true
            this.consoleClicked = false
        },
        handleConsoleClick() {
            this.consoleClicked = true
            this.detailsClicked = false
        }
    }
}
</script>
