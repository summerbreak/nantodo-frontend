<template>
  <div class="container">
    <div class="header">
      <el-menu ref="menu"
        :default-active="activeIndex"
        class="menu"
        mode="horizontal"
        router
      >
        <el-menu-item index="/" class="menu-item">首页</el-menu-item>
        <el-menu-item index="/group" class="menu-item">小组</el-menu-item>
        <el-menu-item index="/course" class="menu-item">课程</el-menu-item>
        <el-menu-item index="/discovery" class="menu-item">发现</el-menu-item>
      </el-menu>
      <div class="personal">
        <div v-if="!isLogin" class="login" @click="handleLogin">
          <i class="bi bi-box-arrow-in-right"></i>
          <span style="margin-left: 10px;">登录</span>
        </div>
        <div v-else class="user">
          <el-badge is-dot :hidden="!isRedDot" class="red-dot">
            <div class="notice" @click="openNotice">
                <i class="bi bi-bell"></i>
            </div>
          </el-badge>
          <el-dropdown>
            <div class="personal-center" @click="toUser">
              <el-avatar :size="32" style="--el-avatar-bg-color: gold;margin-top: 4px;">
                <i class="bi bi-person-fill" style="font-size: 22px;"></i>
              </el-avatar>
              <span style="line-height: 40px;margin-left: 10px; color: black; font-size: 16px;">{{ user.name }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toUser">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="nantodo" @click="toIndex">
        <img src="./assets/pic/nantodo.png" style="width: 100%;height: 80%;object-fit: cover;margin-top: 10px;">
      </div>
    </div>
    <div class="main">
      <!-- 如有需要，在自定义组件内可以继续写el-container/aside/main... -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="footer">
      <div class="footer-nantodo">
        <img src="./assets/pic/nantodo.png" style="height: 60%;object-fit: cover;">
        <div>让小组分工合作更简单</div>
      </div>
      <div style="text-align: center; margin-top: 10px; margin-left: 10%; width: 10%;">
        <h3>关于我们</h3>
        <div style="color: gray;">常见问题</div>
        <div style="color: gray;">意见反馈</div>
        <div style="color: gray;">联系我们</div>
        <div style="color: gray;">法律条款</div>
      </div>
      <div style="text-align: center; margin-top: 10px; width: 10%;">
        <h3>关注我们</h3>
        <i class="bi bi-wechat" style="font-size: 24px; margin-right: 5px;"></i>
        <i class="bi bi-sina-weibo" style="font-size: 24px; margin-left: 5px;"></i>
      </div>
      <div style="text-align: center; margin-top: 10px; width: 10%;">
        <h3>友情链接</h3>
        <div style="color: gray;"><a href="https://www.nju.edu.cn" style="color: gray;">南京大学</a></div>
        <div style="color: gray;"><a href="https://teaching.applysquare.com" style="color: gray;">教学立方</a></div>
      </div>
    </div>
    <div class="bottom">
      ©2023-2033 NANTODO 苏ICP备19073881号-1
    </div>
  </div>
  <el-drawer v-model="showNotice">
    <template #header>
      <h3>消息列表</h3>
      <span class="delete-all" @click="deleteMessage('', true)">清空全部</span>
    </template>
    <el-empty v-show="!messageList.length" description="还没有消息哦" image=" "></el-empty>
    <el-timeline v-show="messageList.length">
      <el-timeline-item
      v-for="message in messageList"
      :key="message.id"
      :type="message.type"
      :timestamp="message.timestamp"
      class="timeline-item"
      >
        <div class="message">
          <span>{{ message.content }}</span>
          <i class="bi bi-x-lg delete-message" @click="deleteMessage(message.id)"></i>
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-drawer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'

const router = useRouter()
const activeIndex = ref('/')
const isLogin = ref(true)
const isRedDot = ref(true)
const showNotice = ref(false)
const user = reactive({
  name: '匡宏宇'
})

const messageList = reactive([
  {id: 'qwee', content: '您收到来自“人机交互小组”布置的任务', type: 'primary', timestamp: '2023-09-16 18:38'},
  {id: 'dzfs', content: '您申请加入小组“操作系统小组”被拒绝', type: 'danger', timestamp: '2023-09-16 14:43'},
  {id: 'xsdf', content: '您已成功加入小组“人机交互小组”', type: 'success', timestamp: '2023-09-15 20:02'},
  {id: 'dsfs', content: '您已成功加入课程“人机交互系统”', type: 'success', timestamp: '2023-09-15 10:46'}
])

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  let secondIndex = newValue.indexOf('/', 1)
  if (secondIndex != -1) {
    newValue = newValue.slice(0, secondIndex)
  }
  console.log(newValue)
  activeIndex.value = newValue
}, {immediate: true})

function toIndex() {
  location.href = "/"
}

function toUser() {
  // router.push("/user")
}

function openNotice() {
  isRedDot.value = false
  showNotice.value = true
}

function closeNotice() {
  // showNotice.value = false
}

function handleLogin() {
  // router.push("/login")
  isLogin.value = true
}

function handleLogout() {
  isLogin.value = false
}

function deleteMessage(id, isAll=false) {
  if (isAll) {
    messageList.length = 0
  } else {
    let index = messageList.findIndex(message => message.id == id)
    messageList.splice(index, 1)
  }
}

</script>

<style scoped>
:deep(.el-badge__content.is-fixed.is-dot) {
  right: 12px;
  top: 10px;
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
  min-height: calc(100% - 80px);
  /* opacity: 1; */
  background-image: radial-gradient(#FFDAB9 0.6px, oldlace 0.6px);
  background-size: 12px 12px;
  
  overflow: hidden;
}

.footer {
  height: 200px;
  background-color: #fffffa;
  position: relative;
  z-index: 5;
  box-shadow: var(--el-box-shadow-light);
  display: flex;
  flex-direction: row;
}

.footer-nantodo {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom {
  position: relative;
  bottom: 18px;
  z-index: 5;
  font-size: 12px;
  color: gray;
  width: 100%;
  text-align: center;
}

.personal {
  height: 40px;
  position: fixed;
  z-index: 20;
  right: 100px;
  top: 20px;
}

.login {
  height: 100%;
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

.user {
  display: flex;
  flex-direction: row;
}

.notice {
  height: 40px;
  width: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  &:hover {
    cursor: pointer;
    background-color:	wheat;
    border-radius: 10px;
  }
}

.personal-center {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-left: 20px;
  width: 100px;
  outline: none;
  &:hover {
    cursor: pointer;
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
  background-color: #fffffa;
}

.menu-item {
  width: 150px;
  font-size: 20px;
  --el-menu-active-color: orange;
  --el-menu-hover-text-color: darkorange;
  --el-menu-hover-bg-color: #fffffa;
}

.message {
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.timeline-item {
  min-height: 80px;
  .delete-message {
    display: none;
  }
  &:hover {
    .delete-message {
      display: block;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.delete-all {
  &:hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}

</style>
