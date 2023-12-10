<template>
    <div class="login-container">
        <div class="background-image"></div>

        <div class="login-box" v-if="!isRegistering">
            <div class="t-tab-top">欢迎您使用南土豆</div>
            <div class="container-fluid" style="padding-bottom: 24px;">
                <div class="form">
                    <div style="padding:15px 5px;">
                        <div class="form-group" style="margin-bottom: 10px;">
                            <el-input v-model="account" placeholder="请输入账号" height="20px" size="large" />
                        </div>
                        <div class="form-group" style="margin-bottom: 20px;">
                            <el-input v-model="password" type="password" placeholder="请输入密码" size="large" show-password />
                        </div>
                        <div class="form-group" style=" margin-bottom: 22px; display: flex; justify-content: center;">
                            <el-button type="warning" style="width: 100%; height: 42px;font-size: 18px;" @click="login">登
                                录</el-button>
                        </div>
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
        </div>
        <Register v-else />
    </div>
</template>

<script>
import Register from '../components/Register.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '../stores/user.js'
export default {
    setup() {
        const isRegistering = ref(false)
        const account = ref('')
        const password = ref('')
        const userStore = useUserStore()

        const login = async () => {
            try {
                const response = await axios.get('/login', {
                    params: {
                        phone: account.value,
                        password: password.value
                    }
                })

                if (response.status === 200) {
                    console.log('登录成功', response.data)
                    userStore.setUser(response.data)
                } else if (response.status === 401) {
                    console.log('密码错误', response.status)
                } else {
                    console.log('账号不存在', response.status)
                }
            } catch (error) {
                console.error('请求失败', error)
            }
        }

        const showRegister = () => {
            isRegistering.value = true
        }

        return {
            isRegistering,
            account,
            password,
            login,
            showRegister
        }
    },
    components: {
        Register
    }
};
</script> 

<style scoped>
:deep(.el-input__inner) {
    height: 48px;
    border-radius: 8px;
    /* border: 1px solid #db8916; */
    background-color: #ffffff;
    color: #db8916;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    padding: 0 10px;
}

.login-container {
    position: relative;
    height: 100vh;
}


.background-image {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    background: url('../assets/pic/Autumn.jpg') center/cover no-repeat;
    z-index: 0;
    /* 将背景图片放到最底层 */
}

.login-box {
    border-radius: 8px;
    /* 圆角 */
    position: absolute;
    top: 43%;
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

