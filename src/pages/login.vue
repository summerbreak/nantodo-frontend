<template>
    <div class="login-container">
        <div class="background-image"></div>

        <div class="login-box">
            <div class="t-tab-top">登 录</div>
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
                        <div class="form-group margin-bottom-15 margin-top-35">
                            <a target="_blank" style="color:#3fb5df;float:left;margin-left: 20px;">
                                <span style="color: black;" @click="register">立即注册</span>
                            </a>
                            <a target="_blank" style="color:#3fb5df;float:right;margin-right:29px;">
                                <span style="color: black;">忘记密码</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  

<script>
import { ref } from 'vue'
export default {
    setup() {
        const account = ref('')
        const password = ref('')
        return {
            account,
            password,
        }
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            // 在这里处理登录逻辑
            console.log('Logging in...', this.username, this.password);
        },
    },
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
    background: url('../assets/pic/autumn.jpg') center/cover no-repeat;
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
    background: rgba(255, 255, 255, 0.8);
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
</style>