<template>
    <main class="relative">
        <ResizableGrid>
            <template v-slot:left>
                <VMList :vm_list="vm_list" @showVMCreator="showVMCreator" />
            </template>

            <template v-slot:right>
                <VMDetails />
            </template>
        </ResizableGrid>
        <VMCreator v-show="isVMCreatorVisible" @close="hideVMCreator" />
        <Message type="warning" message="foo" />
    </main>
</template>

<script lang="ts">
import ResizableGrid from "@/components/ResizableGrid.vue"
import VMList from "@/components/VMList.vue"
import VMDetails from "@/components/VMDetails.vue"
import VMCreator from "@/components/VMCreator.vue"
import Message from "@/components/Message.vue"

export default {
    name: "VMView",
    components: {
        VMList,
        ResizableGrid,
        VMDetails,
        VMCreator,
        Message
    },
    data() {
        return {
            vm_list: [],
            isVMCreatorVisible: false
        }
    },
    methods: {
        showVMCreator() {
            console.log("showing VM creator")
            this.isVMCreatorVisible = true
        },

        hideVMCreator() {
            console.log("hiding VM creator")
            this.isVMCreatorVisible = false
        }
    },
    async created() {
        const response = await fetch("http://localhost:3000/vm", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const vm_list = await response.json()
            console.log(vm_list)

            this.vm_list = vm_list
        } else {
            console.error("Failed to fetch hardware data")
        }
    }
}
</script>
