<template>
  <div style="display: flex; flex-direction: column">
    <!-- <div v-if="edit" style="display: flex; flex-direction: row; justify-content: flex-end">
        <el-button @click="edit = false;">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </div>
      <div v-else style="display: flex; flex-direction: row-reverse; align-items: flex-end">
        <el-button type="primary" @click="edit = true; setForm()">编辑</el-button>
      </div>
  
      <br /> -->
    <!-- <div class="block" v-if="!edit">
        
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="30%" class="demo-ruleForm" label-position="right"
        hide-required-asterisk size="large">
        <el-form-item label="姓名" prop="name">
          <el-text v-model="form.username" style="width: 25vh" :disabled="true" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 25vh" :disabled="!edit" />
        </el-form-item>
        <el-form-item label="证件类型" prop="type">
          <el-select v-model="form.type" placeholder=" " style="width: 25vh" :disabled="!edit">
            <el-option value="身份证" />
            <el-option value="护照" />
            <el-option value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="idn">
          <el-input v-model="form.idn" type="text" style="width: 25vh" :disabled="!edit" />
        </el-form-item>
  
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" style="width: 25vh" :disabled="!edit" />
        </el-form-item>
      </el-form>
    </div> -->
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import axios from 'axios'

const userStore = useUserStore()
const edit = ref(false)
const form = ref({
  name: '',
  type: '',
  id: '',
  phone: '',
  email: '',
  studentNumber: '',
  grade: '',
})

const setForm = async () => {
  form.value = {
    name: userStore.user.name,
    type: userStore.user.type,
    id: userStore.user.id,
    phone: userStore.user.phone,
    email: userStore.user.email,
    studentNumber: userStore.user.studentNumber,
    grade: userStore.user.grade,
  }
}

watch(user, () => {
  setForm()
})

setForm()
</script>