<template>
    <main class="relative items-center">
        <LoginForm @error="setMessage" />
        <Message
            v-if="showMessage"
            :type="type"
            :message="message"
            @close="showMessage = false"
        />
    </main>
</template>

<script lang="js">
import LoginForm from "../components/LoginForm.vue"
import Message from "../components/Message.vue"

export default {
    name: "LoginView",
    data() {
        return {
            showMessage: false,
            message: "",
            type: "success"
        }
    },
    components: {
        LoginForm,
        Message
    },
    methods: {
        setMessage(data) {
            console.log("setting message")
            this.message = data.message
            this.type = data.type
            this.showMessage = true
        }
    }
}
</script>
