<template>
    <dialog
        v-show="isVisible"
        class="z-30 absolute top-0 left-0 flex justify-center items-center w-full h-full rounded-sm p-1 border border-indigo-500 bg-transparent backdrop-blur-sm"
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
                    <select
                        class="ml-2 rounded-xl p-1 text-indigo-500"
                        v-model="firmware"
                    >
                        <option value="uefi">UEFI</option>
                        <option value="bios">BIOS</option>
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
                        v-model="cores"
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
                        :value="512"
                        class="ml-2 border text-right"
                        v-model="memory"
                    />
                </label>

                <label class="flex items-center justify-between">
                    <span class="border-b font-bold">GPU</span>
                    <select
                        class="ml-2 rounded-xl p-1 text-indigo-500"
                        v-model="gpu"
                    >
                        <option value="qxl">QXL</option>
                        <option value="vga">VGA</option>
                        <option value="bochs">Bochs</option>
                        <option value="virtio">Virtio</option>
                        <option value="ramfb">Ramfb</option>
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

                <!-- Disk Creator -->
                <div
                    v-show="showDiskCreator"
                    class="flex flex-col gap-2 bg-gray-100 rounded-xl"
                >
                    <ul class="bg-gray-200 h-16 overflow-y-scroll rounded-t-xl">
                        <li
                            v-for="(disk, index) in disks"
                            :key="index"
                            class="hover:cursor-default border w-fit rounded-xl m-1 bg-gray-300 text-indigo-500 border-indigo-500 p-1"
                        >
                            <p>{{ disk.name }}</p>
                        </li>
                    </ul>

                    <div class="flex gap-5">
                        <div>
                            <p class="border-b text-xs text-right">Name</p>
                            <input
                                class="border text-right"
                                type="text"
                                v-model="disk_name"
                            />
                        </div>

                        <div>
                            <p class="border-b text-xs text-right">Size (GB)</p>
                            <input
                                class="border text-right"
                                type="number"
                                @keypress="isNumber"
                                v-model="disk_size"
                                min="1"
                            />
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button
                            @click="addDisk"
                            class="bg-indigo-500 hover:bg-indigo-400 text-white p-1 rounded-xl"
                        >
                            Add Disk
                        </button>
                    </div>
                </div>

                <label class="flex items-center justify-between">
                    <span class="border-b font-bold">ISO</span>
                    <select
                        class="ml-2 rounded-xl p-1 text-indigo-500"
                        v-model="iso"
                    >
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

<script lang="js">
export default {
    name: "VMCreator",

    methods: {
        addDisk() {
            if (
                this.disk_name === "" ||
                this.disk_size === 0 ||
                this.disk_size === ""
            ) {
                this.$emit("message", {
                    type: "error",
                    message: "Name and size are required!"
                })

                return
            }

            this.disks.push({
                name: this.disk_name,
                size: this.disk_size
            })
        },

        isNumber(event) {
            const keyValue = event.key
            if (!/[0-9.]/.test(keyValue)) {
                event.preventDefault()
            }
        },

        async handleFileUpload(event) {
            const file = event.target.files[0]
            const title = file.name
            const size = file.size

            // Upload ISO to server as chunks
            const chunk_size = 1024 * 1024 * 10

            this.uploading = true
            let uploadedChunks = 0
            const totalChunks = Math.ceil(size / chunk_size)

            for (let i = 0; i < size; i += chunk_size) {
                const chunk = file.slice(i, i + chunk_size)
                if (!event) {
                    return
                }

                let formData = new FormData()

                formData.append("title", title)
                formData.append("chunk", chunk)

                const response = await fetch(
                    `${window.location.origin}/api/upload-iso`,
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

            const isos = await fetch(`${window.location.origin}/api/iso`)

            if (isos.ok) {
                const data = await isos.json()
                this.iso_list = data
            }

            this.uploading = false
            this.uploadProgress = 0
            this.iso = title
            this.$emit("message", {
                type: "success",
                message: "Upload successful!"
            })
        },

        toggleDiskCreator() {
            this.showDiskCreator = !this.showDiskCreator
        },

        async createVM() {
            // Check if all properties are valid
            if (
                this.name === "" ||
                this.firmware === "" ||
                this.cores === 0 ||
                this.memory === 0 ||
                this.disks.length === 0 ||
                this.iso === ""
            ) {
                this.$emit("message", {
                    type: "error",
                    message: "Please fill in all fields"
                })

                return
            }

            let config = {
                name: this.name,
                firmware: this.firmware,
                cores: this.cores,
                memory: this.memory,
                gpu: this.gpu,
                disks: this.disks,
                iso: this.iso
            }

            const response = await fetch(`${window.location.origin}/api/vm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(config)
            })

            if(response.ok) {
                this.$emit("message", {
                    type: "success",
                    message: "VM Created Successfully"
                })
            } else {
                this.$emit("message", {
                    type: "error",
                    message: "Failed to create VM"
                })
            }

            // reset all
            this.name = ""
            this.firmware = "uefi"
            this.cores = 1
            this.memory = 512
            this.gpu = "qxl"
            this.disks = []
            //this.iso = ""vm_url
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

            disks: [],
            disk_name: "",
            disk_size: 1,

            name: "",
            firmware: "uefi",
            cores: 1,
            memory: 512,
            gpu: "qxl",
            iso: ""
        }
    },
    async mounted() {
        const iso_response =  await fetch(`${window.location.origin}/api/iso`)

        if (iso_response.ok) {
            const data = await iso_response.json()
            this.iso_list = data
            this.iso = data[0]
        }

        const specs_response = await fetch(`${window.location.origin}/api/hardware`)

        if (specs_response.ok) {
            const data = await specs_response.json()
            this.max_cpu = data.cpu.logical_cores
            this.max_ram = Math.round(data.memory.total / 1024 ** 2)
        }
    }
}
</script>
