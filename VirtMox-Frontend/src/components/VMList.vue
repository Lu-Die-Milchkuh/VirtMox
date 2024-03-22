<template>
    <div class="relative h-full bg-gray-100 flex flex-col border">
        <ul class="border-none flex flex-col flex-grow overflow-y-scroll">
            <li
                v-for="vm in vm_list"
                :key="vm.name"
                @click="selectVM(vm.name)"
                :class="{
                    'bg-indigo-500': selectedVM === vm.name,
                    'text-white': selectedVM === vm.name
                }"
                class="hover:cursor-pointer hover:rounded-xl hover:text-white text-center border-b hover:bg-gray-400"
            >
                <h2>{{ vm.name }}</h2>
            </li>
        </ul>
        <button
            @click="$emit('showVMCreator')"
            class="border-none w-full top-0 right-0 bg-indigo-500 hover:bg-indigo-400 p-1 text-white flex justify-center items-center"
        >
            <div class="h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="#ffffff"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                    />
                </svg>
            </div>
        </button>
    </div>
</template>

<script lang="js">
export default {
    name: "VMList",
    props: ["vm_list"],
    components: {},
    data() {
        return {
            selectedVM: null
        }
    },
    methods: {
        selectVM(vmName) {
            this.selectedVM = vmName
            this.$emit("showVMDetails", vmName)
        }
    },
    created() {
        if (this.vm_list.length > 0) {
            this.selectedVM = this.vm_list[0].name
            this.$emit("showVMDetails", this.selectedVM)
        }

    }
}
</script>
