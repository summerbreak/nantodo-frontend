import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    let user = {
        id: '111',
        name: '匡宏宇',
        studentNumber: '211250250',
    }

    function getUser() {
        return user
    }

    function setUser(newUser) {
        user = {...newUser}
    }

    return {getUser, setUser}
})