<template>
  <div style="display: flex; flex-direction: column">
    <div class="block" v-if="!edit">
      <el-form label-width="30%" class="selfInfo" label-position="right" hide-required-asterisk size="large">
        <el-form-item label="姓名" prop="name" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px; font-weight: normal;"> {{ form.name }}</el-text>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">{{ form.phone }}</el-text>
        </el-form-item>
        <el-form-item label="学号" prop="studentNumber" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">{{ form.studentNumber
          }}</el-text>
        </el-form-item>
        <el-form-item label="年级" prop="grade" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">{{ form.grade }}</el-text>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px;font-weight: normal;"> {{ form.email }}</el-text>
        </el-form-item>
        <el-form-item>
          <el-button type="warning"
            style="width: 50%; height: 42px;font-size: 18px;display: flex; justify-content: center;"
            @click="edit = true; setForm()">编辑</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div v-else>
      <el-form label-width="30%" class="selfInfo" label-position="right" hide-required-asterisk size="large">
        <el-form-item label="姓名" prop="name" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px; font-weight: normal;"> {{ form.name }}</el-text>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="font-weight: bold;">
          <el-text style="width: 25vh; font-size: 18px;font-weight: normal;" :disabled="true">{{ form.phone }}</el-text>
        </el-form-item>

        <el-form-item label="学号" prop="studentNumber" style="font-weight: bold;">
          <el-input v-model="form.studentNumber" style="width: 25vh;font-size: 18px" :disabled="true" />
        </el-form-item>
        <el-form-item label="年级" prop="grade" style="font-weight: bold;">
          <el-input v-model="form.grade" style="width: 25vh ;font-size: 18px" :disabled="true" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="font-weight: bold;">
          <el-input v-model="form.email" style="width: 25vh ;font-size: 18px" :disabled="true" />
        </el-form-item>
        <el-form-item>

          <el-button style="height: 42px;font-size: 18px;" @click="edit = false;">取消</el-button>
          <el-button type="warning" style="height: 42px;font-size: 18px;" @click="submitForm(ruleFormRef)">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style scoped>
.el-form-item__label {
  font-weight: bold;
}
</style>


<script setup>
import { reactive, ref, watch } from "vue"
import { useUserStore } from '../stores/user.js'
import axios from 'axios'

const ruleFormRef = ref()
const userStore = useUserStore()
const user = userStore.getUser()
const edit = ref(false)
const form = reactive({
  name: '',
  id: '',
  phone: '',
  email: '',
  studentNumber: '',
  grade: '',
})

const rule = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  studentNumber: [
    { required: true, message: '请输入学号', trigger: 'blur' },
  ],
  grade: [
    { required: true, message: '请选择年级', trigger: 'change' },
  ],
})

const setForm = async () => {
  console.log(user)
  form.id = user.id;
  form.name = user.name;
  form.phone = user.phone;
  form.email = user.email;
  form.studentNumber = user.studentNumber;
  form.grade = user.grade;
}

watch(userStore.getUser, () => {
  setForm()
})

setForm()


</script>