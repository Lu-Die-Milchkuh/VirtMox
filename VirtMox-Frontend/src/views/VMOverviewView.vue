<template>
    <main class="relative">
        <ResizableGrid>
            <template v-slot:left>
                <VMList
                    :vm_list="vm_list"
                    @showVMCreator="showVMCreator"
                    @showVMDetails="showVM"
                />
            </template>

            <template v-slot:right>
                <VMTab :vm="selected_vm" v-if="selected_vm" />
            </template>
        </ResizableGrid>
        <VMCreator
            v-show="isVMCreatorVisible"
            @close="hideVMCreator"
            @message="setMessage"
        />
        <Message
            v-if="showMessage"
            :type="type"
            :message="message"
            @close="showMessage = false"
        />
    </main>
</template>

<script lang="ts">
import ResizableGrid from "@/components/ResizableGrid.vue"
import VMList from "@/components/VMList.vue"
import VMTab from "@/components/VMTab.vue"
import VMCreator from "@/components/VMCreator.vue"
import Message from "@/components/Message.vue"

export default {
    name: "VMView",
    components: {
        VMList,
        ResizableGrid,
        VMTab,
        VMCreator,
        Message
    },
    data() {
        return {
            vm_list: [],
            isVMCreatorVisible: false,
            selected_vm: null,

            showMessage: false,
            message: "",
            type: "success"
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
        },

        setMessage(data) {
            this.message = data.message
            this.type = data.type
            this.showMessage = true
        },

        showVM(name) {
            let vm = this.vm_list.find((vm) => vm.name === name)

            if (vm) {
                this.selected_vm = vm
            }
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
            //console.log(vm_list)

            this.selected_vm = vm_list[0]
            this.vm_list = vm_list
        } else {
            console.error("Failed to fetch hardware data")
        }
    }
}
</script>
