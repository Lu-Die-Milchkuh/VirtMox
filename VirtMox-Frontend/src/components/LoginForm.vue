<template>
    <div
        class="flex flex-col top-1/2 left-1/2 absolute -translate-y-1/2 -translate-x-1/2 gap-5"
    >
        <h2 class="text-center font-bold">Login to Continue</h2>
        <form class="flex flex-col gap-5">
            <input
                type="text"
                placeholder="Username"
                class="border-2 rounded-md"
            />
            <input
                type="password"
                placeholder="Password"
                class="border-2 rounded-md"
            />
            <button type="submit" class="border-2 rounded-md border-indigo-500">
                Login
            </button>
        </form>
    </div>
</template>

<script lang="ts">
export default {
    name: "LoginForm",
    components: {}
}
</script>
