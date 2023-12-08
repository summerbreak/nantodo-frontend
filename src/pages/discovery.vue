<template>
    <h2>这里是发现</h2>
    <button @click="toGroup1">示例1</button>
    <button @click="toGroup2">示例2</button>
</template>

<script setup>
import {useRouter} from 'vue-router';
import axios from 'axios';

const router = useRouter()

function toGroup1() {
    router.push({
        path: '/course',
        query: {
            id: 'xxxxxx'
        }
    })
}
function toGroup2() {
    router.push({
        path: '/group',
        query: {
            id: '2'
        }
    })
}

function postUser() {
    axios.post('http://localhost:8080/user', {
        name: "张维为",
        password: "123456",
        phone: "11451419198",
        email: "123456789@zww.com",
        studentNumber: "211250999",
        avatarUrl: "",
        grade: "大四"
    }).then(res => {
        console.log(res) // 请求成功的回调
    }, err => {
        console.log(err) // 请求失败的回调
    })
}

function getTask() {
    let id = '656f0fc5b7821e754548b245'
    axios.get(`http://localhost:8080/task?id=${id}`)
        .then(res => {
            console.log(res)
        }, err => {
            console.log(err)
        })
}

</script>

<style scoped>
</style>