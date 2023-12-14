<template>
    <div class="register-box">
        <el-container>
            <el-main style="width: 375px;">
                <div class="t-tab-top">欢迎您注册南土豆账号</div>
                <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="auto">
                    <el-form-item label="账号：" prop="phone">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password />
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="passwordConfirm">
                        <el-input v-model="registerForm.passwordConfirm" placeholder="请确认密码" show-password />
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="registerForm.name" placeholder="您的姓名" />
                    </el-form-item>
                    <el-form-item label="学号：" prop="studentNumber">
                        <el-input v-model="registerForm.studentNumber" placeholder="您的学号" />
                    </el-form-item>
                    <el-form-item label="年级：" prop="selectedGrade">
                        <el-select v-model="registerForm.selectedGrade" placeholder="选择您的年级">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="registerForm.email" placeholder="您的邮箱" />
                    </el-form-item>
                    <el-form-item prop="agree">
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
import { defineEmits } from 'vue'
import axios from 'axios'
const options = ref([
    { label: '大一', value: '大一' },
    { label: '大二', value: '大二' },
    { label: '大三', value: '大三' },
    { label: '大四', value: '大四' },
    // 添加更多年级...
]);
const registerFormRef = ref(null);
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
    registerFormRef.value.validate(async valid => {
        if (valid) {
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
            emit('register-success');
        } else {
            console.log('表单验证失败');
            return false;
        }
    });


}
function validatePasswordConfirm(rule, value, callback) {
    if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}
const emit = defineEmits(['register-success'])
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
    padding: 35px 0 15px 0;
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