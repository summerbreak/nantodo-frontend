<template>
  <el-button :icon="ArrowUpBold" type="warning" plain @click="inviteStuff">
    加个课程
  </el-button>
  <el-dialog
      v-model="dialogVisible"
      title="添加全部课程"
      width="50%"
      :before-close="handleClose"
  >
    <el-form :model="courseInfo" label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="courseInfo.name"/>
      </el-form-item>
      <el-form-item label="课程教师">
        <el-input v-model="courseInfo.teacher"/>
      </el-form-item>
      <el-form-item label="课程封面">
        <el-input v-model="courseInfo.url"/>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="courseInfo.grade" type="number" maxlength="4" minlength="4"/>
      </el-form-item>
      <el-form-item label="是否开放">
      <el-radio-group v-model="courseInfo.open" size="default">
        <el-radio-button label="true" />
        <el-radio-button label="false" />
      </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消添加</el-button>
        <el-button type="primary" @click="addCourse">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script setup>
import {ref, reactive} from 'vue'
import {ArrowUpBold} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import axios from "axios";

const dialogVisible = ref(false)
const courseInfo = reactive({
  url: '',
  name: '',
  teacher: '',
  description: '',
  grade: 2021,
  open:true,
  groups: [],
  homeworks: [],
})
const inviteStuff = () => {
  dialogVisible.value = true
}
const handleClose = (done) => {
  done()
}

const addCourse = () => {
  dialogVisible.value = false
  console.log(courseInfo)
  axios.post('http://localhost:11300/course', courseInfo).then(res => {
    console.log(res)
  }).catch(error => {
    alert(error)
  })
}

</script>

<style scoped>

</style>