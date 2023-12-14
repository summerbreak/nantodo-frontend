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
            @click="edit = true;">编辑</el-button>
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
          <el-input v-model="form.studentNumber" style="width: 25vh;font-size: 18px" />
        </el-form-item>
        <el-form-item label="年级" prop="grade" style="font-weight: bold;">
          <el-select v-model="form.grade" placeholder="选择您的年级" style="width: 25vh;font-size: 18px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="font-weight: bold;">
          <el-input v-model="form.email" style="width: 25vh ;font-size: 18px" />
        </el-form-item>
        <el-form-item>

          <el-button style="height: 42px;font-size: 18px;" @click="edit = false; setForm()">取消</el-button>
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
import { reactive, ref, watch, onActivated } from "vue"
import { useUserStore } from '../stores/user.js'
import axios from 'axios'

const ruleFormRef = ref()
const userStore = useUserStore()
const edit = ref(false)
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

const setForm = () => {
  const User = userStore.getUser()
  form.name = User.name
  form.phone = User.phone
  form.email = User.email
  form.studentNumber = User.studentNumber
  form.grade = User.grade

}
setForm

onActivated(() => {
  const User = userStore.getUser()
  form.name = User.name
  form.id = User.id
  form.phone = User.phone
  form.email = User.email
  form.studentNumber = User.studentNumber
  form.grade = User.grade
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
  updateUser(User);
  userStore.setUser(User)
  edit.value = false
}

</script>