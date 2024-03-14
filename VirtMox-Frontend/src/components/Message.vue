<template>
    <div
        ref="message-container"
        class="absolute top-0 left-0 w-full flex shadow-xl"
        :class="{
            'bg-green-500': type === 'success',
            'bg-red-500': type === 'error',
            'bg-yellow-400': type === 'warning'
        }"
        :style="{ display: isVisible ? 'flex' : 'none' }"
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
    props: {
        message: String,
        type: String
    },
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        hide() {
            this.isVisible = false
        }
    },
    watch: {
        type(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.isVisible = true
            }
        },
        message(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.isVisible = true
            }
        }
    }
}
</script>
