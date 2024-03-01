<template>
    <router-link
        :to="link"
        class="absolute bottom-0 right-0 m-2 border-2 bg-indigo-500 hover:bg-indigo-400 hover:scale-110 rounded-xl w-fit p-1 text-white"
    >
        Show More
    </router-link>
</template>

<script lang="ts">
export default {
    name: "ShowMoreButton",
    components: {},
    props: ["link"],
    methods: {
        showMore: () => {
            console.log("Show More")
        }
    }
}
</script>
