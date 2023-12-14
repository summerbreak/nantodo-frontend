import { defineStore } from "pinia";
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

    function getUser() {
        return user
    }

    function setUser(newUser) {
        if (newUser) {
            user = {...newUser}
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

    return {getUser, setUser, updateUser}
})