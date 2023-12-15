<template>
    <div style="width: 100%;margin-left: 50%;">
        <el-form :rules="rule" ref="ruleFormRef" label-width="auto" class="selfInfo" label-position="right"
            hide-required-asterisk size="large">
            <h1 style="font-size: 30px; font-weight: bold; margin-bottom: 20px;margin-left: 5%;">个人信息</h1>
            <el-form-item label="姓名" prop="name" style="font-weight: bold;margin-left: 10%;">
                <el-text style="width: 25vh; font-size: 18px; font-weight: normal;"> {{ form.name }}</el-text>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" style="font-weight: bold;margin-left: 10%">
                <el-text style="width: 25vh; font-size: 18px;font-weight: normal;" :disabled="true">{{ form.phone
                }}</el-text>
            </el-form-item>
            <el-form-item label="学号" prop="studentNumber" style="font-weight: bold;margin-left: 10%">
                <el-input v-model="form.studentNumber" style="width: 25vh;font-size: 18px" />
            </el-form-item>
            <el-form-item label="年级" prop="grade" style="font-weight: bold;margin-left: 10%">
                <el-select v-model="form.grade" placeholder="选择您的年级" style="width: 25vh;font-size: 18px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" style="font-weight: bold;margin-left: 10%">
                <el-input v-model="form.email" style="width: 25vh ;font-size: 18px" />
            </el-form-item>
            <h1 style="font-size: 30px; font-weight: bold; margin-bottom: 20px;margin-left: 5%;">通用设置</h1>
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;margin-left: 5%;"> 紧急模式</h3>

            <el-form-item label="开始时间" prop="emergencyDays" style="font-weight: bold;margin-left: 10%">
                <span class="font">距离DDL&nbsp;&nbsp;</span>
                <el-input-number v-model="form.settings.emergencyDays"
                    style="height:35px;width: 15vh; font-size: 18px; font-weight: normal;"></el-input-number>
                <span class="font">&nbsp;&nbsp;天</span>
            </el-form-item>
            <el-form-item label="提醒频率" prop="noticeFrequency" style="font-weight: bold;margin-left: 10%">
                <span class="font">每&nbsp;&nbsp;</span>
                <el-input-number v-model="form.settings.noticeFrequency"
                    style="height:35px;width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                <span class="font">&nbsp;&nbsp;小时提醒</span>
            </el-form-item>
            <div style="display: flex; align-items: center;margin-top: -15px;margin-bottom: 5px;">
                <h3 style="font-size: 20px; font-weight: bold;margin-left:5%;"> 静默模式</h3>
                <el-switch v-model="form.settings.quietMode" active-color="#db8916" style="margin-left: 1%;"></el-switch>
            </div>
            <el-form-item label="开始时间" prop="quietModeStart" style="font-weight: bold;margin-left: 10%;"
                v-if="form.settings.quietMode">
                <span class="font">从&nbsp;&nbsp;&nbsp;</span>
                <el-input-number v-model="form.settings.quietModeStart"
                    style="height:35px;width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                <span class="font">&nbsp;&nbsp;&nbsp;点</span>

            </el-form-item>
            <el-form-item label="结束时间" prop="quietModeEnd" style="font-weight: bold;margin-left: 10%;"
                v-if="form.settings.quietMode">
                <span class="font">到&nbsp;&nbsp;&nbsp;</span>

                <el-input-number v-model="form.settings.quietModeEnd"
                    style="height:35px;width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                <span class="font">&nbsp;&nbsp;&nbsp;点</span>
            </el-form-item>
            <el-form-item style="font-weight: bold;margin-left: 15%;" v-if="dirty">
                <el-button style="height: 42px;font-size: 18px;"
                    @click="dirty = false; count = -1; setForm()">取消</el-button>
                <el-button type="warning" style="height: 42px;font-size: 18px;" @click="submitForm()">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, onMounted, onActivated, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { onBeforeRouteLeave } from 'vue-router';
import { useUserStore } from '../stores/user.js'
import axios from 'axios'
const ruleFormRef = ref()
const userStore = useUserStore()
const user = userStore.getUser()
const dirty = ref(false)
const count = ref(-1)
const options = ref([
    { label: '大一', value: '大一' },
    { label: '大二', value: '大二' },
    { label: '大三', value: '大三' },
    { label: '大四', value: '大四' },
    // 添加更多年级...
]);
const form = reactive({
    name: '',
    id: '',
    phone: '',
    email: '',
    studentNumber: '',
    grade: '',
    settings: {
        emergencyDays: '',
        noticeFrequency: '',
        quietMode: false,
        quietModeStart: '',
        quietModeEnd: '',
    }
})

watch(
    form,
    (newValue, oldValue) => {
        if (count.value >= 0) {
            dirty.value = true
            console.log('deep', newValue.count, oldValue.count)
        }
        count.value++
    },
    { deep: true }
)

onBeforeRouteLeave((to, from, next) => {
    if (dirty.value) {
        ElMessage.warning('请先保存修改')
        next(false)
    } else {
        next()
    }
})

const rule = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    studentNumber: [
        { required: true, message: '请输入学号', trigger: 'blur' },
    ],

})

function setForm() {
    form.name = user.name
    form.id = user.id
    form.phone = user.phone
    form.email = user.email
    form.studentNumber = user.studentNumber
    form.grade = user.grade
    console.log("setSettings", user)
    if (!user || !user.settings) {
        console.error('User or user settings is undefined');
        return;
    }
    form.settings.emergencyDays = user.settings.emergencyDays
    form.settings.noticeFrequency = user.settings.noticeFrequency
    form.settings.quietMode = user.settings.quietMode
    form.settings.quietModeStart = user.settings.quietModeStart
    form.settings.quietModeEnd = user.settings.quietModeEnd
}

onActivated(() => {
    setForm()
})


async function updateUser(user) {
    const response = await axios.put(`http://localhost:8080/user?id=${form.id}`, user);
    console.log("change successful", response.data);
}

const submitForm = () => {
    const User = userStore.getUser()
    User.email = form.email
    User.studentNumber = form.studentNumber
    User.grade = form.grade
    User.settings = form.settings
    updateUser(User);
    userStore.setUser(User)
    dirty.value = false;
    ElMessage.success('修改成功')

}
</script>

<style scoped>
.font {
    font-size: 15px;
    font-weight: normal;
}
</style>