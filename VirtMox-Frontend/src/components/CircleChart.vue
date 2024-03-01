<template>
    <div
        class="relative h-48 w-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
        <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-xl"
            >{{ percentage }} %</span
        >
        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#E5E7EB"
                stroke-width="6"
                fill="none"
            ></circle>
            <circle
                ref="outerCircle"
                class="stroke-current"
                stroke-linecap="round"
                cx="50%"
                cy="50%"
                r="45%"
                stroke-width="6"
                fill="none"
            ></circle>
        </svg>
    </div>
</template>

<script lang="ts">
export default {
    name: "CircleChart",
    components: {},
    props: ["type"],
    data() {
        return {
            percentage: 0
        }
    },
    methods: {
        drawCircleChart() {
            const outerCircle = this.$refs.outerCircle as SVGCircleElement

            if (outerCircle) {
                const radius = outerCircle.r.baseVal.value
                const circumference = radius * 2 * Math.PI
                outerCircle.style.strokeDasharray = `${circumference} ${circumference}`
                outerCircle.style.strokeDashoffset = `${
                    circumference - (this.percentage / 100) * circumference
                }`

                let color
                if (this.percentage < 50) {
                    color = "green"
                } else if (this.percentage >= 50 && this.percentage < 75) {
                    color = "yellow"
                } else {
                    color = "red"
                }

                outerCircle.style.stroke = color
            }
        }
    },
    mounted() {
        const ws_url = "ws://" + window.location.hostname + ":3000"
        const ws = new WebSocket(ws_url)

        ws.onopen = () => {
            console.log("Connected to the WS server")

            setInterval(() => {
                ws.send(this.$props.type)
            }, 1000)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            this.percentage = data.percentage
            this.drawCircleChart()
        }
    }
}
</script>
