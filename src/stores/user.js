import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    let user = {}

    function getUser() {
        return user
    }

    function setUser(newUser) {
        user = {...newUser}
    }

    return {getUser, setUser}
})