<template>
    <el-carousel class="bg" :height="bg_height" :interval="6000">
        <el-carousel-item v-for="(pic, index) in bg_pics" :key="index">
            <img :src="pic" class="bg-img">
        </el-carousel-item>
    </el-carousel>
    <div class="container">
        <div class="join">
            <span class="headline">南土豆，您的小组分工合作助手</span>
            <el-button class="button" @click="handleLogin">登录</el-button>
        </div>
        <div class="card-container">
            <el-card class="card">
                <div class="card-top">
                    <i class="bi bi-file-text"></i>
                    <div style="margin-left: 10px;">小组作业</div>
                </div>
                <span style="color: gray;">与同学分工合作完成课程作业</span>
            </el-card>
            <el-card class="card">
                <div class="card-top">
                    <i class="bi bi-people-fill"></i>
                    <div style="margin-left: 10px;">组织活动</div>
                </div>
                <span style="color: gray;">召集好伙伴一起健身，桌游</span>
            </el-card>
            <el-card class="card">
                <div class="card-top">
                    <i class="bi bi-trophy-fill"></i>
                    <div style="margin-left: 10px;">比赛组队</div>
                </div>
                <span style="color: gray;">与同学分工合作完成课程作业</span>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import bg1 from '../assets/pic/welcome_bg_1.jpg'
import bg2 from '../assets/pic/welcome_bg_2.jpg'
import bg3 from '../assets/pic/welcome_bg_3.jpg'

const router = useRouter()
const bg_pics = reactive([bg1, bg2, bg3])
const bg_height = ref('')

onMounted(() => {
    bg_height.value = document.documentElement.clientHeight - 80 + 'px'
})

function handleLogin() {
    router.push("/login")
}


</script>

<style scoped>
.bg {
    width: 100%;
    position: fixed;
    z-index: 4;
}


.bg-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.container {
    height: 80%;
    width: 80%;
    position: relative;
    z-index: 5;
    margin: auto;
}

.card-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    opacity: 0.9;
}
.card {
    margin-left: 20px;
    margin-right: 20px;
    padding: 0;
    height: 200px;
    width: 300px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
}

.headline {
    font-size: 80px;
    font-weight:700;
    color: white;
    margin-bottom: 50px;
    text-shadow: 0 0 4px #555;
}

.join {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
}

.button {
    width: 100px;
    height: 60px !important;
    font-size: 26px;
    opacity: 0.9;
    background-color: lightyellow;
    color: darkorange;
    border: 0;
}

</style>