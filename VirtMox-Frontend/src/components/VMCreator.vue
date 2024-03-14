<template>
    <dialog
        v-show="isVisible"
        class="absolute top-0 left-0 flex justify-center items-center w-full h-full rounded-sm p-1 border border-indigo-500 bg-transparent backdrop-blur-sm"
    >
        <div
            class="relative border rounded-xl p-2 bg-white border-indigo-500 flex justify-center items-center flex-col shadow-xl shadow-gray-500"
        >
            <div class="relative flex flex-col gap-y-2">
                <label class="flex items-center justify-between rounded-sm p-1">
                    <span class="border-b font-bold">Name</span>
                    <input type="text" class="ml-2 border" v-model="name" />
                </label>

                <label class="flex items-center justify-between">
                    <span class="border-b font-bold">Firmware</span>
                    <select class="ml-2 rounded-xl p-1 text-indigo-500">
                        <option>UEFI</option>
                        <option>BIOS</option>
                    </select>
                </label>

                <label class="flex items-center justify-between p-1">
                    <div>
                        <span class="border-b font-bold">Cores</span>
                        <p class="text-xs">Up to {{ max_cpu }}</p>
                    </div>

                    <input
                        @keypress="isNumber"
                        type="number"
                        min="1"
                        :max="max_cpu"
                        value="1"
                        class="ml-2 border text-right"
                    />
                </label>

                <label class="flex items-center justify-between p-1">
                    <div>
                        <span class="border-b font-bold">Memory</span>
                        <p class="text-xs">Up to {{ max_ram }} MB</p>
                    </div>

                    <input
                        @keypress="isNumber"
                        type="number"
                        min="1"
                        :max="max_ram"
                        :value="Math.round(max_ram / 2)"
                        class="ml-2 border text-right"
                    />
                </label>

                <label class="flex items-center justify-between">
                    <span class="border-b font-bold">GPU</span>
                    <select class="ml-2 rounded-xl p-1 text-indigo-500">
                        <option>QXL</option>
                        <option>VGA</option>
                        <option>Bochs</option>
                        <option>Virtio</option>
                        <option>Ramfb</option>
                    </select>
                </label>

                <label class="flex items-center justify-between border-b">
                    <span class="font-bold">Disk</span>
                    <div
                        v-if="!showDiskCreator"
                        class="border rounded-full flex justify-center h-fit items-center bg-gray-200"
                    >
                        <svg
                            @click="toggleDiskCreator"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            class="w-6 h-6 inline-block hover:cursor-pointer"
                        >
                            <path
                                fill="gray"
                                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                            />
                            <path
                                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                            />
                        </svg>
                    </div>

                    <div
                        v-if="showDiskCreator"
                        class="border rounded-full flex justify-center h-fit items-center bg-gray-200"
                    >
                        <svg
                            v-if="showDiskCreator"
                            @click="toggleDiskCreator"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            class="w-6 h-6 text-indigo-500 inline-block hover:cursor-pointer"
                        >
                            <path
                                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                            />
                            <path
                                fill="gray"
                                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                            />
                        </svg>
                    </div>
                </label>

                <DiskCreator v-if="showDiskCreator" />

                <label class="flex items-center justify-between">
                    <span class="border-b font-bold">ISO</span>
                    <select class="ml-2 rounded-xl p-1 text-indigo-500">
                        <option v-for="iso in iso_list" :key="iso" :value="iso">
                            {{ iso }}
                        </option>
                    </select>
                </label>

                <label class="flex items-center justify-between p-1">
                    <span class="border-b font-bold">Upload ISO</span>
                    <div class="ml-2">
                        <input
                            type="file"
                            accept=".iso"
                            class="sr-only"
                            @change="handleFileUpload($event)"
                        />
                        <span
                            class="inline-block py-1 px-3 bg-gray-200 cursor-pointer rounded-xl text-indigo-500"
                            >Choose File</span
                        >
                    </div>
                </label>
            </div>

            <div class="flex justify-evenly w-full gap-5 mt-2">
                <button
                    :class="{
                        'bg-gray-300': uploading,
                        'bg-indigo-500': !uploading
                    }"
                    class="hover:bg-indigo-400 text-white p-1 rounded-xl flex-1"
                    @click="createVM"
                >
                    Create VM
                </button>
                <button
                    :class="{
                        'bg-gray-300': uploading,
                        'bg-indigo-500': !uploading
                    }"
                    class="hover:bg-indigo-400 text-white p-1 rounded-xl flex-1"
                    @click="$emit('close')"
                >
                    Cancel
                </button>
            </div>

            <div
                v-if="uploading"
                class="absolute top-0 left-0 w-full h-full z-10 flex justify-end"
            ></div>

            <div
                v-if="uploading"
                class="mt-4 relative w-full h-4 bg-gray-200 rounded-md overflow-hidden"
            >
                <div
                    :style="{ width: uploadProgress + '%' }"
                    class="absolute top-0 left-0 h-full bg-indigo-500"
                ></div>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts">
import DiskCreator from "./DiskCreator.vue"

export default {
    name: "VMCreator",
    components: {
        DiskCreator
    },
    methods: {
        isNumber(event: KeyboardEvent) {
            const keyValue = event.key
            if (!/[0-9.]/.test(keyValue)) {
                event.preventDefault()
            }
        },
        async handleFileUpload(event: Event) {
            const file = (event.target as HTMLInputElement).files[0]
            const title = file.name
            const size = file.size

            // Upload ISO to server as chunks
            const chunk_size = 1024 * 1024 * 10

            this.uploading = true
            let uploadedChunks = 0
            const totalChunks = Math.ceil(size / chunk_size)

            for (let i = 0; i < size; i += chunk_size) {
                const chunk = file.slice(i, i + chunk_size)

                let formData = new FormData()

                formData.append("title", title)
                formData.append("chunk", chunk)

                const response = await fetch(
                    "http://localhost:3000/upload-iso",
                    {
                        method: "POST",
                        body: formData
                    }
                )

                if (!response.ok) {
                    console.error("Failed to upload chunk")
                    break
                }

                uploadedChunks++
                this.uploadProgress = (uploadedChunks / totalChunks) * 100
            }

            const isos = await fetch("http://localhost:3000/iso")

            if (isos.ok) {
                const data = await isos.json()
                this.iso_list = data
            }

            this.uploading = false
        },
        toggleDiskCreator() {
            this.showDiskCreator = !this.showDiskCreator
        },

        createVM() {
            // Getting all the values from the form
        }
    },
    data() {
        return {
            isVisible: false,
            iso_list: [],
            uploading: false,
            uploadProgress: 0,
            max_cpu: 0,
            max_ram: 0,
            showDiskCreator: false,

            name: "",
            firmware: ""
        }
    },
    async created() {
        const iso_response = await fetch("http://localhost:3000/iso")

        if (iso_response.ok) {
            const data = await iso_response.json()
            this.iso_list = data
        }

        const specs_response = await fetch("http://localhost:3000/hardware")

        if (specs_response.ok) {
            const data = await specs_response.json()
            this.max_cpu = data.cpu.logical_cores
            this.max_ram = Math.round(data.memory.total / 1024 ** 2)
        }
    }
}
</script>
