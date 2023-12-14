import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore('user', () => {
    let user = {
        id: '',
        name: '',
        studentNumber: '',
        email: '',
        phone: '',
        avatarUrl: '',
        grade: ''
    }

    let isLogin = ref(false)

    function getUser() {
        return user
    }

    function setUser(newUser) {
        if (newUser) {
            user = {...newUser}
            isLogin.value = true
        }
    }

    function updateUser() {
        axios.put(`http://localhost:8080/user?id=${user.id}`, user).then(
            res => {
                console.log('update user success', res)
            }, err => {
                console.log('update user fail', err)
            }
        )
    }

    return {isLogin, getUser, setUser, updateUser}
})