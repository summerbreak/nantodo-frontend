<template>
  <el-button :icon="Share" type="warning" plain @click="inviteStuff">
    通过邀请码加入
  </el-button>
</template>

<script setup>
import {Share} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const inviteStuff=()=>{
  ElMessageBox.prompt('请输入邀请码', '加入小组', {
    confirmButtonText: '确认加入',
    cancelButtonText: '取消'}).then(({ value }) => {
    ElMessage({
      type: 'success',
      message: '加入成功',
    })
  })
}


</script>

<style scoped>

</style>