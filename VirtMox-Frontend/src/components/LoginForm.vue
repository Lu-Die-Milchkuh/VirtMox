<template>
    <div class="flex flex-col h-full w-full justify-center items-center gap-5">
        <h2 class="text-center font-bold text-xl">Login to Continue</h2>
        <form class="flex flex-col gap-5">
            <input
                type="text"
                placeholder="Username"
                class="border-2 rounded-md"
                required
                v-model="username"
            />
            <input
                type="password"
                placeholder="Password"
                class="border-2 rounded-md"
                required
                v-model="password"
            />
            <button
                type="submit"
                class="rounded-xl bg-indigo-500 text-white hover:bg-indigo-400"
                @click="login($event)"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script lang="js">
export default {
    name: "LoginForm",
    components: {},
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async login(event) {
            event.preventDefault()
            if (this.username === "" || this.password === "") {
                this.$emit("error", {
                    message: "Username and Password cannot be empty",
                    type: "error"
                })
                return
            }

            try {
                const response = await fetch(`${window.location.origin}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })

                if(response.ok) {
                    sessionStorage.setItem("loggedin", true)
                    console.log("Logged in")
                    this.$router.push({ name: "server" })
                } else {
                    this.$emit("error", {
                        message: "Invalid Username or Password",
                        type: "error"
                    })
                }
            } catch(err) {
                this.$emit("error", {
                    message: "An error occurred while logging in. Please try again later.",
                    type: "error"
                })
            }
        }
    }
}
</script>
