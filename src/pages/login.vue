<template>
    <div class="login-container">
        <div class="background-image"></div>

        <div class="login-box" v-if="!isRegistering">
            <div class="t-tab-top">欢迎您使用南土豆</div>
            <div class="container-fluid" style="padding-bottom: 15px;">
                <div class="form" style="padding:15px 5px 0px 5px;">
                    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-position="top">
                        <el-form-item prop="account" style="margin-bottom: 25px;front-size:18px">
                            <el-input v-model="loginForm.account" placeholder="请输入手机号" size="large" style="height: 50px;" />
                        </el-form-item>
                        <el-form-item prop="password" style="margin-bottom: 25px;front-size:18px">
                            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large"
                                style="height: 50px;" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" style="width: 100%; height: 42px;font-size: 18px;" @click="login">登
                                录</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="links">
                        <a class="link" target="_blank" @click="showRegister">
                            立即注册
                        </a>
                        <a class="link" target="_blank">
                            忘记密码
                        </a>
                    </div>

                </div>
            </div>
        </div>
        <Register v-else @register-success="isRegistering = false" />
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import Register from '../components/Register.vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { useUserStore } from '../stores/user.js'
import { ElMessage } from 'element-plus';
const props = defineProps(['isRegister'])
watch(() => props.isRegister, () => {
    console.log(props.isRegister)
    isRegistering.value = false
})

const loginFormRef = ref(null);
const isRegistering = ref(false)
const loginForm = reactive({
    account: '',
    password: ''
})
const userStore = useUserStore()
const router = useRouter();
const rules = {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' }

    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}
async function login() {
    loginFormRef.value.validate(valid => {
        if (valid) {
            // 如果表单验证成功，执行登录操作
            axios.get('http://localhost:8080/user/login', {
                params: {
                    phone: loginForm.account,
                    password: loginForm.password
                }
            }).then(response => {
                handleLoginResponse(response)
            }, err => {
                console.log(err) // 请求失败的回调
            })
        } else {
            // 如果表单验证失败，显示错误信息
            console.log('表单验证失败');
            return false;
        }
    });
}
function handleLoginResponse(response) {
    if (response.status === 200) {
        console.log('登录成功', response.data)
        userStore.setUser(response.data)
        console.log(userStore.getUser())
        ElMessage.success('登录成功')
        // 修改的登录成功消息
        localStorage.setItem('currentUser', JSON.stringify(response.data.id))
        location.href = '/'

    } else if (response.status === 401) {
        console.log('密码错误', response.status)
        ElMessage.error('密码错误')
    } else if (response.status === 404) {
        console.log('账号不存在', response.status)
        console.log(response.data)
        ElMessage.error('账号不存在')
    }
}

const showRegister = () => {
    isRegistering.value = true
}


</script> 

<style scoped>
:deep(.el-input__inner) {
    font-size: 16px;
}

.login-container {
    position: relative;
    height: calc(100vh - 80px);
}


.background-image {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/pic/Autumn.jpg') center/cover no-repeat;
    z-index: 0;
    /* 将背景图片放到最底层 */
}

.login-box {
    border-radius: 8px;
    /* 圆角 */
    position: absolute;
    top: 48%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 325px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.t-tab-top {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
    text-align: center;
    padding: 5px 0 20px 0;
    border-bottom: 1px solid #db8916;
    margin-bottom: 20px;
}

.form {
    display: flex;
    flex-direction: column;
}

.links {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
}

.link {
    font-size: 16px;
    font-weight: 400;
    color: gray;

    &:hover {
        cursor: pointer;
        color: #db8916;
    }

}
</style>

