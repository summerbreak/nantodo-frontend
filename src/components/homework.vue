<template>
  <el-card class="homework-box-card" body-class="card-body" v-if="!nothing">
    <template #header>
      <div class="card-header">
        <el-text size="large" tag="b" style="font-size: large">当前作业：{{ homeworkInfo.title }}</el-text>
        <el-text type="success" size="large" v-if="hasCommit">
          <el-icon>
            <CircleCheck/>
          </el-icon>
          <span style="margin-left: 3px">已提交</span></el-text>
        <el-text type="danger" size="large" v-else>
          <el-icon>
            <CircleClose/>
          </el-icon>

          <span style="margin-left: 3px">未提交</span></el-text>
      </div>
    </template>
    <el-scrollbar max-height="400px">
      <span v-html="content"/>
    </el-scrollbar>
    <!--    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>-->
    <template #footer>
      <div class="card-header">
        <div>
          <el-text size="default" tag="b">提交时间：</el-text>
          <el-text>{{ release }} →</el-text>
          <el-text>{{ ddl }}</el-text>
        </div>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="teamPromptInfo"
            placement="top"
            v-if="!isLeader"
        >
          <el-button :disabled="!isLeader" style="width: 100px" v-if="hasCommit">修改作业</el-button>
          <el-button :disabled="!isLeader" style="width: 100px" v-else>交作业</el-button>
        </el-tooltip>
        <div v-else>
          <el-button :disabled="!isLeader" style="width: 100px" v-if="hasCommit"
                     @click="dialogVisible=true">修改作业
          </el-button>
          <el-button :disabled="!isLeader" style="width: 100px" v-else @click="dialogVisible=true">交作业
          </el-button>
        </div>
      </div>
    </template>
  </el-card>
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="40%"
  >
    <el-text size="large">确认提交当前作业？</el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateHomework">
          确认提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <h2 style="margin-left: 20px">历史作业</h2>
  <el-timeline>
    <el-timeline-item timestamp="2018/5/2" placement="top" :icon="inactivateHomework.Submit.icon"
                      :type="inactivateHomework.Submit.type"
                      :size="inactivateHomework.Submit.size"
                      :hollow="inactivateHomework.Submit.hollow">
      <el-card :body-style="{ padding: '5px 15px 5px'}" class="group-card">
        <el-row style="margin: 5px">
          <el-text tag="b" style="font-size: 18px">实验安排3 - 商业模式设计</el-text>
        </el-row>
        <el-row style="margin: 5px">
          <el-col :span="8">
            <el-text tag="b">截止日期：</el-text>
            <el-text>2023-11-2</el-text>
          </el-col>
          <el-col :span="4">
            <el-text tag="b">状态：</el-text>
            <el-text>已提交</el-text>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top" :icon="inactivateHomework.notSubmit.icon"
                      :type="inactivateHomework.notSubmit.type"
                      :size="inactivateHomework.notSubmit.size"
                      :hollow="inactivateHomework.notSubmit.hollow">
      <el-card :body-style="{ padding: '5px 15px 5px'}" class="group-card">
        <el-row style="margin: 5px">
          <el-text tag="b" style="font-size: 18px">实验安排2 - 商业模式评估</el-text>
        </el-row>
        <el-row style="margin: 5px">
          <el-col :span="8">
            <el-text tag="b">截止日期：</el-text>
            <el-text>2023-11-2</el-text>
          </el-col>
          <el-col :span="4">
            <el-text tag="b">状态：</el-text>
            <el-text>未提交</el-text>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/3/2" placement="top" :icon="inactivateHomework.Submit.icon"
                      :type="inactivateHomework.Submit.type"
                      :size="inactivateHomework.Submit.size"
                      :hollow="inactivateHomework.Submit.hollow">
      <el-card :body-style="{ padding: '5px 15px 5px'}" class="group-card">
        <el-row style="margin: 5px">
          <el-text tag="b" style="font-size: 18px">实验安排1 - 项目启动</el-text>
        </el-row>
        <el-row style="margin: 5px">
          <el-col :span="8">
            <el-text tag="b">截止日期：</el-text>
            <el-text>2023-11-2</el-text>
          </el-col>
          <el-col :span="4">
            <el-text tag="b">状态：</el-text>
            <el-text>已提交</el-text>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import {onActivated, ref} from 'vue'
import {Close, Check, CircleCheck, Right, CircleClose, UploadFilled} from '@element-plus/icons-vue'
import axios from "axios";
import {useUserStore} from "../stores/user.js";
import {ElMessage} from "element-plus";

const props = defineProps(['info'])
const nothing = ref(true)
// const user = useUserStore().getUser()
const homeworkInfo = ref({})
const content = ref('')
const release = ref('')
const ddl = ref('')
const dialogVisible = ref(false)

const isLeader = ref(false)
const hasTeam = ref(false)
const hasCommit = ref(false)
const teamInfo = ref({})

const hasTeamInfo = ref('只有组长可以提交或修改作业')
const noTeamInfo = ref('请先加入小组')
const teamPromptInfo = ref('')
onActivated(async () => {
  content.value = ''
  console.log('props', props.info)
  const user = useUserStore().getUser()
  await axios.get(`http://localhost:8080/course?id=${props.info}`).then(async res => {
    teamPromptInfo.value = noTeamInfo.value.slice(0)
    if (res.data.homeworks.length > 0) {
      nothing.value = false
      axios.get(`http://localhost:8080/homework?id=${res.data.homeworks[0]}`).then(res2 => {
        homeworkInfo.value = res2.data
        let tmp = homeworkInfo.value.content.slice(0)
        tmp = tmp.replace(/\\n/g, '<br/>')
        content.value = tmp
        let releaseDate = new Date(homeworkInfo.value.releaseTime)
        release.value = getNowFormatDate(releaseDate)
        let endDate = new Date(homeworkInfo.value.deadline)
        ddl.value = getNowFormatDate(endDate)
      })
    } else {
      nothing.value = true
    }
    await axios.get(`http://localhost:8080/user?id=${user.id}`).then(
        async res3 => {
          let tmp = []
          let teamId = ''
          tmp.splice(0, 0, ...res3.data.groups)
          hasTeam.value = false
          tmp.map(item => {
            if (res.data.groups.includes(item)) {
              teamId = item
              hasTeam.value = true
              teamPromptInfo.value = hasTeamInfo.value.slice(0)
            }
          })
          if (hasTeam.value) {
            await axios.get(`http://localhost:8080/group?id=${teamId}`).then(
                res4 => {
                  teamInfo.value = res4.data
                  if (teamInfo.value.leaderId == user.id) {
                    isLeader.value = true
                  } else {
                    isLeader.value = false
                  }
                }
            ).catch(err => {
              alert(err)
            })
          }
        }
    ).catch(err => {
      alert(err)
    })
    if (hasTeam.value) {
      hasCommit.value = false
      homeworkInfo.value.doneGroups.map(item => {
        if (item == teamInfo.value.id) {
          hasCommit.value = true
        }
      })
    }
  }).catch(error => {
    console.log(error)
  })
})

//获取当前日期函数
function getNowFormatDate(date) {
  let obj = {
    year: date.getFullYear(), //获取完整的年份(4位)
    month: date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate: date.getDate(), // 获取当前日(1-31)
    week: '星期' + '日一二三四五六'.charAt(date.getDay()), //获取当前星期几(0 ~ 6,0代表星期天)
    hour: date.getHours(), //获取当前小时(0 ~ 23)
    minute: date.getMinutes(), //获取当前分钟(0 ~ 59)
    second: date.getSeconds() //获取当前秒数(0 ~ 59)
  }
  Object.keys(obj).forEach(key => {
    if (obj[key] < 10) obj[key] = `0${obj[key]}`
  })

  return `${obj.year}年${obj.month}月${obj.strDate}日 ${obj.hour}:${obj.minute}`
}

const updateHomework = async () => {
  dialogVisible.value = false
  console.log(teamInfo.value)
  console.log(hasCommit.value)
  if (!hasCommit.value) {
    homeworkInfo.value.doneGroups.push(teamInfo.value.id)
    await axios.put(`http://localhost:8080/homework?id=${homeworkInfo.value.id}`, homeworkInfo.value).then(res => {
      hasCommit.value = true
      ElMessage({
        showClose: true,
        message: '作业提交成功',
        type: 'success',
      })
    }).catch(err => {
      ElMessage({
        showClose: true,
        message: '出错了，作业提交失败',
        type: 'error',
      })
    })
  } else {
    ElMessage({
      showClose: true,
      message: '作业修改成功',
      type: 'success',
    })
  }
}

const inactivateHomework = {
  notSubmit: {
    type: 'danger',
    hollow: false,
    size: 'large',
    icon: Close
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
.group-card {
  padding: 0;
  margin: 0;
  width: 75%;
}

.card-header {
  display: flex;
  padding: 0;
  margin-outside: 0;
  justify-content: space-between;
}

.homework-box-card {
  width: 98%;
  margin: 5px auto;
}

:deep(.card-body) {
  padding: 0;
  margin: 15px 20px;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>