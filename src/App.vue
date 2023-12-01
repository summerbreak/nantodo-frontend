<template>
  <div class="container">
    <div class="header">
      <el-menu ref="menu"
        :default-active="activeIndex"
        class="menu"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/" class="menu-item">首页</el-menu-item>
        <el-menu-item index="group" class="menu-item">小组</el-menu-item>
        <el-menu-item index="course" class="menu-item">课程</el-menu-item>
        <el-menu-item index="discovery" class="menu-item">发现</el-menu-item>
      </el-menu>
      <div class="login" @click="handleLogin">
        <i class="bi bi-box-arrow-in-right"></i>
        <span style="margin-left: 10px;">登录</span>
      </div>
      <div class="nantodo" @click="toIndex">
        <img src="./assets/pic/nantodo.png" style="width: 100%;height: 80%;object-fit: cover;margin-top: 10px;">
      </div>
    </div>
    <div class="main">
      <!-- 如有需要，在自定义组件内可以继续写el-container/aside/main... -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const activeIndex = ref('/')

onMounted(() => {
  console.log(router.currentRoute.value)
})

function toIndex() {
  location.href = "/"
}

function handleSelect(index) {
  console.log(index)
  activeIndex.value = index
}

function handleLogin() {
  router.push("/login")
}

</script>

<style scoped>
div {
  table-layout: fixed;
  word-wrap: break-word;
  overflow: hidden;
}

.container {
  height: 100%;
}

.header {
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
}

.main {
  /* margin-top: 80px; */
  padding-top: 80px;
  height: calc(100% - 80px);
  background-color: #FFFAF0;
  /* opacity: 1; */
  background-image: radial-gradient(#FFDAB9 0.6000000000000001px, #FFFAF0 0.6000000000000001px);
  background-size: 12px 12px;
}

.login {
  height: 40px;
  position: fixed;
  z-index: 20;
  right: 100px;
  top: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
    background-color:	wheat;
    border-radius: 10px;
  }
}

.nantodo {
  height: 80px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 10%;
  &:hover {
    cursor: pointer;
  }
}

.menu {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0 !important;
  bottom: 0;
  background-color: oldlace;
}

.menu-item {
  width: 150px;
  font-size: 20px;
  --el-menu-active-color: orange;
  --el-menu-hover-text-color: darkorange;
  --el-menu-hover-bg-color: oldlace;
}


</style>
