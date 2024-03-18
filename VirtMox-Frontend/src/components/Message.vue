<template>
    <div
        ref="message-container"
        class="absolute top-0 left-0 w-full flex shadow-xl shadow-gray-400"
        :class="{
            'bg-green-500': type === 'success',
            'bg-red-500': type === 'error',
            'bg-yellow-400': type === 'warning'
        }"
    >
        <div class="flex justify-center items-center w-full">
            <p class="flex-grow text-center text-white">{{ message }}</p>
            <button class="text-white m-2" @click="hide">&times;</button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Message",
    props: ["type", "message"],
    data() {
        return {}
    },
    methods: {
        hide() {
            this.$emit("close")
        }
    }
}
</script>
