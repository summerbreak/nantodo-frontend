<template>
    <div class="register-box">
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
    <!-- <div class="register-box">
        <h2>注册</h2>
        <el-input v-model="account" placeholder="请输入账号" />
        <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
        <el-button type="primary" @click="register">注册</el-button>
    </div> -->
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        const account = ref('')
        const password = ref('')

        const register = () => {
            // 在这里处理注册逻辑
            console.log('Registering...', account.value, password.value)
        }

        return {
            account,
            password,
            register
        }
    }
}
</script>
  
<style scoped>
.register-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>