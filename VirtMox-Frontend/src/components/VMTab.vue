<template>
    <div class="flex flex-col h-full">
        <div class="relative flex justify-start w-fit">
            <button
                class="border focus:outline-none transition-colors duration-300 rounded-t-xl p-1"
                :class="{
                    'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400':
                        detailsClicked,
                    'hover:border-indigo-400': !detailsClicked
                }"
                @click="handleDetailsClick"
            >
                Details
            </button>

            <button
                class="border focus:outline-none transition-colors duration-300 rounded-t-xl p-1"
                :class="{
                    'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400':
                        consoleClicked,
                    'hover:border-indigo-400': !consoleClicked
                }"
                @click="handleConsoleClick"
            >
                Console
            </button>
        </div>

        <div
            v-show="detailsClicked"
            class="relative border-2 border-indigo-500 flex-grow overflow-y-auto w-full"
        >
            <h2 class="text-center text-3xl text-indigo-500">
                {{ vm.name }}
            </h2>

            <table class="table-fixed w-full text-center">
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
                <tr class="border" v-for="(value, key) in vm" :key="key">
                    <td class="border">{{ key }}</td>
                    <td class="border" v-if="typeof value === 'object'">
                        <ul v-if="Array.isArray(value)">
                            <li v-for="(item, index) in value" :key="index">
                                {{ item.path }}
                            </li>
                        </ul>
                        <template v-else>
                            <ul>
                                <li
                                    v-for="(subValue, subKey) in value"
                                    :key="subKey"
                                >
                                    <strong>{{ subKey }}:</strong>
                                    {{ subValue }}
                                </li>
                            </ul>
                        </template>
                    </td>
                    <td v-else>{{ value }}</td>
                </tr>
            </table>
        </div>

        <div
            v-show="consoleClicked"
            class="relative border-2 border-indigo-500 flex-grow overflow-y-auto"
        >
            <p>Console Content Here</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "VMTab",
    props: ["vm"],
    data() {
        return {
            detailsClicked: true,
            consoleClicked: false
        }
    },
    methods: {
        handleDetailsClick() {
            this.detailsClicked = true
            this.consoleClicked = false
        },
        handleConsoleClick() {
            this.consoleClicked = true
            this.detailsClicked = false
        }
    }
}
</script>
