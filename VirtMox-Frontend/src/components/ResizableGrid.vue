<template>
    <div class="relative flex w-full h-full">
        <div
            class="border bg-gray-50 min-w-[10%] max-w-[90%] resize-x"
            :style="{ width: leftWidth + '%' }"
        >
            <slot name="left"></slot>
        </div>

        <div
            ref="splitterDiv"
            class="border w-[5px] max-w-[5px] bg-gray-300 cursor-col-resize"
            @mousedown="startResize"
        ></div>

        <div
            class="border min-w-[10%] max-w-[90%] resize-x"
            :style="{ width: rightWidth + '%' }"
        >
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "ResizableGrid",
    data() {
        return {
            isResizing: false,
            startX: 0,
            leftWidth: 10,
            rightWidth: 90,
            minWidthPercent: 10,
            parentWidth: window.innerWidth
        }
    },
    methods: {
        startResize(e: MouseEvent) {
            e.preventDefault()

            this.isResizing = true
            this.startX = e.clientX

            document.addEventListener("mousemove", this.resize)
            document.addEventListener("mouseup", this.stopResize)
        },

        stopResize(e: MouseEvent) {
            e.preventDefault()

            this.isResizing = false

            document.removeEventListener("mousemove", this.resize)
            document.removeEventListener("mouseup", this.stopResize)
        },

        resize(e: MouseEvent) {
            e.preventDefault()

            if (this.isResizing) {
                const deltaX = e.clientX - this.startX

                const newLeftWidth =
                    this.leftWidth + (deltaX / this.parentWidth) * 100
                const newRightWidth =
                    this.rightWidth - (deltaX / this.parentWidth) * 100

                if (
                    newLeftWidth >= this.minWidthPercent &&
                    newRightWidth >= this.minWidthPercent &&
                    newLeftWidth <= 100 - this.minWidthPercent &&
                    newRightWidth <= 100 - this.minWidthPercent
                ) {
                    this.leftWidth = newLeftWidth
                    this.rightWidth = newRightWidth
                    this.startX = e.clientX
                }
            }
        }
    }
}
</script>

<style scoped>
.resize-x {
    resize: horizontal;
}
</style>
