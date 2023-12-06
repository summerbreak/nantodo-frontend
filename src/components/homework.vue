<template>
  <el-timeline>
    <el-timeline-item timestamp="2018/4/3" placement="top" :icon="activateHomework.notSubmit.icon"
                      :type="activateHomework.notSubmit.type"
                      :size="activateHomework.notSubmit.size"
                      :hollow="activateHomework.notSubmit.hollow">
      <el-card :body-style="{ padding: '5px 15px 5px'}" class="group-card">
        <el-text tag="b">状态：</el-text> <el-text>未提交</el-text>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top" :icon="activateHomework.Submit.icon"
                      :type="activateHomework.Submit.type"
                      :size="activateHomework.Submit.size"
                      :hollow="activateHomework.Submit.hollow">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top" :icon="inactivateHomework.notSubmit.icon"
                      :type="inactivateHomework.notSubmit.type"
                      :size="inactivateHomework.notSubmit.size"
                      :hollow="inactivateHomework.notSubmit.hollow">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top" :icon="inactivateHomework.Submit.icon"
                      :type="inactivateHomework.Submit.type"
                      :size="inactivateHomework.Submit.size"
                      :hollow="inactivateHomework.Submit.hollow">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Close, Check} from '@element-plus/icons-vue'

const activateHomework = {
  notSubmit: {
    type: 'success',
    hollow: true,
    size: 'large'
  },
  Submit: {
    type: 'success',
    hollow: false,
    size: 'large',
    icon: Check
  }
}

const inactivateHomework = {
  notSubmit: {
    type: 'danger',
    hollow: false,
    size: 'large',
    icon:Close
  },
  Submit: {
    type: 'primary',
    hollow: false,
    size: 'large',
    icon: Check
  }
}
</script>

<style scoped>
.group-card{
  padding: 0;
  margin: 0;
  width: 80%;
}
</style>