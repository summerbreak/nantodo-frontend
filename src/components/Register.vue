<template>
    <div class="register-box">
        <el-container>

            <el-main style="width: 375px;">
                <div class="t-tab-top">欢迎您注册南土豆账号</div>
                <!-- <div class="form">
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">账号：</label>
                        <el-input v-model="phone" placeholder="请输入手机号" height="20px" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">密码：</label>
                        <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;width: 150px;min-width: 100px;font-weight: bold;white-space: nowrap;;text-align: right;">确认密码：</label>
                        <el-input v-model="passwordConfirm" type="password" placeholder="请确认密码" show-password />
                    </div>

                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">姓名：</label>
                        <el-input v-model="name" placeholder="您的姓名" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">学号：</label>
                        <el-input v-model="studentNumber" placeholder="您的学号" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 120px;text-align: right;">年级：</label>
                        <el-select v-model="selectedGrade" class="m-2" placeholder="选择您的年级" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">邮箱：</label>
                        <el-input v-model="email" placeholder="您的邮箱" />
                    </div>
                    <div class="form-group" style="display: flex; align-items: center;">
                        <el-checkbox v-model="agree">同意</el-checkbox>
                        <a class="regulation" style="color:#db8916">《南土豆使用条例》</a>
                    </div>
                    <div class="form-group" style="margin-bottom: 22px; display: flex; justify-content: center;">
                        <el-button type="warning" style="width: 75%; height: 42px;font-size: 20px;" @click="Register">注
                            册</el-button>
                    </div>

                </div> -->

                <el-form :rules="rules" :model="registerForm" label-position="right" label-width="150px">
                    <el-form-item label="账号：">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password />
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input v-model="registerForm.passwordConfirm" type="password" placeholder="请确认密码"
                            show-password />
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input v-model="registerForm.name" placeholder="您的姓名" />
                    </el-form-item>
                    <el-form-item label="学号：">
                        <el-input v-model="registerForm.studentNumber" placeholder="您的学号" />
                    </el-form-item>
                    <el-form-item label="年级：">
                        <el-select v-model="registerForm.selectedGrade" placeholder="选择您的年级">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model="registerForm.email" placeholder="您的邮箱" />
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="registerForm.agree">同意</el-checkbox>
                        <a class="regulation" style="color:#db8916">《南土豆使用条例》</a>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" style="width: 75%; height: 42px;font-size: 20px;" @click="register">注
                            册</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
const options = ref([
    { label: '大一', value: '大一' },
    { label: '大二', value: '大二' },
    { label: '大三', value: '大三' },
    { label: '大四', value: '大四' },
    // 添加更多年级...
]);
const registerForm = reactive({
    phone: '',
    password: '',
    passwordConfirm: '',
    name: '',
    studentNumber: '',
    email: '',
    selectedGrade: '',
    agree: false

})

const rules = {
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
    ],
    passwordConfirm: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: validatePasswordConfirm, trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    studentNumber: [
        { required: true, message: '请输入学号', trigger: 'blur' }
    ],
    selectedGrade: [
        { required: true, message: '请选择年级', trigger: 'change' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    agree: [
        { validator: validateAgree, trigger: 'change' }
    ]
}

async function register() {
    console.log(registerForm)
    const user = {
        phone: registerForm.phone,
        password: registerForm.password,
        name: registerForm.name,
        studentNumber: registerForm.studentNumber,
        grade: registerForm.selectedGrade,
        email: registerForm.email,
        avatarUrl: ""
    }
    console.log(user)
    const response = await axios.post('http://localhost:8080/user', user);
    console.log(response)
}
function validatePasswordConfirm(rule, value, callback) {
    if (value !== registerForm.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}

function validateAgree(rule, value, callback) {
    if (!value) {
        callback(new Error('你必须同意条款!'));
    } else {
        callback();
    }
}
</script>
  
<style scoped>
.register-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 100vh;
    padding: 30px;
    background: rgba(242, 234, 222, 0.97);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}


.t-tab-top {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
    text-align: center;
    padding: 25px 0 20px 0;
    border-bottom: 1px solid #db8916;
    margin-bottom: 5px;
}

.form-group {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 12px;
    align-items: center;

}

.regulation:hover {
    cursor: pointer;

}
</style>