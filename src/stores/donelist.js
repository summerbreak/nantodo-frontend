import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useDonelistStore = defineStore('doneList', () => {
    const change = reactive({
        total: 0,
        done: 0,
    });

    return {change};
})