<template>
    <div class="login-container">
        <div class="background-image"></div>
        <div class="login-box">
            <h2>登陆</h2>
            <!-- 添加你的登录表单 -->
            <form @submit.prevent="login">
                <!-- 登录表单的输入字段 -->
                <input type="text" id="username" v-model="username" required>
                <input type="password" id="password" v-model="password" required>

                <!-- 登录按钮 -->
                <button type="submit">Login</button>
            </form>
        </div>



        <!-- <div class="login-body">
            <div class="t-tab-top">登录 <span style="font-size: 14px;color:red;">（首次登录请点击下方忘记密码来设置初始密码）</span></div>
            <div class="container-fluid" style="padding-bottom: 24px;">
                <div class="form-horizontal">
                    <div style="padding:32px 48px;">
                        <div class="form-group" style="margin-bottom: 4px;">
                            <input type="text" class="form-control form-bg" name="email"
                                style="background-color: #f8fafc;height: 48px;" placeholder="请输入手机号码">
                        </div>
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input type="password" id="id_login_password" class="form-control form-bg margin-top-20"
                                style="height: 48px;" name="password" placeholder="请输入密码">
                            <div class="eyecon"><img id="showText" src="/public/assets/images/all/eye_b.png" alt=""
                                    onclick="hideShowPsw()"></div>

                        </div>
                        <div class="form-group has-error" style="margin-bottom: 0;">
                            <p class="help-block" style="font-size: 12px; margin-top: 0">
                            </p>
                        </div>
                        <div class="form-group" style="margin-bottom: 22px;">
                            <a id="id_login_button" class="btn btn-success btn-block btn-login" data-id="login">登录</a>
                        </div>
                        <div class="form-group margin-bottom-15 margin-top-35">
                            <a target="_blank" style="color:#3fb5df;float:right">
                                <span style="color: black;">忘记密码？</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->



    </div>
</template>
  
<script>
export default {
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
.login-container {
    position: relative;
    height: 100vh;
}


.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/pic/lion.jpg') center/cover no-repeat;
    z-index: -1;
    /* 将背景图片放到最底层 */
}

.login-box {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
    display: flex;
    flex-direction: column;
}

.label {
    margin-bottom: 5px;
}

.input {
    padding: 8px;
    margin-bottom: 10px;
}

.button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>