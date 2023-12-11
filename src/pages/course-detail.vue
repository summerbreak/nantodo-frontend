<template>
  <!--  <el-scrollbar max-height="1000px" style="margin-bottom: 0;margin-top: 0">-->
  <el-row>
    <el-col :span="20" :offset="2">
      <el-card class="box-card">
        <el-container>
          <el-aside width="40%">
            <el-image
                :src="courseInfo.url"
                class="image"
                :fit="'cover'"
            />
          </el-aside>
          <el-main style="padding: 5px;margin-top: 0;margin-left: 10px">
            <el-text line-clamp="1" class="text">{{ courseInfo.name }}</el-text>
            <el-card shadow="never"
                     class="description">
              <el-text size="large">教师：{{ courseInfo.teacher }}</el-text>
              <br/>
              <el-row>
                <el-col :span="5">
                  <el-text size="large">学期：2023秋</el-text>
                </el-col>
                <el-col :span="8">
                  <el-text size="large">授课年级：{{ courseInfo.grade }}</el-text>
                </el-col>
              </el-row>
              <el-text size="large">小队数目：{{ teamNumber }}</el-text>
            </el-card>
            <div style="margin-top: 20px">
              <div v-if="courseInfo.open">
                <div v-if="selected">
                  <el-button-group size="large" v-if="hasTeam">
                    <el-button :icon="Position" type="warning" plain @click="queryTeam">
                      查看我的小队
                    </el-button>
                    <el-button type="warning" plain @click="getTeamId">
                      复制邀请码
                      <el-icon class="el-icon--right">
                        <Connection/>
                      </el-icon>
                    </el-button>
                  </el-button-group>
                  <el-button-group size="large" v-else>
                    <el-button :icon="Plus" type="warning" plain @click="createTeam">
                      创建我的小队
                    </el-button>
                    <el-button type="warning" plain @click="findTeam">
                      通过邀请码加入小队
                      <el-icon class="el-icon--right">
                        <Connection/>
                      </el-icon>
                    </el-button>
                  </el-button-group>
                  <el-button :icon="DocumentDelete" type="danger" plain @click="dropOut" size="large"
                             style="margin-left: 20px">
                    退出课程
                  </el-button>
                </div>
                <el-button :icon="Pointer" type="success" size="large" plain v-else>
                  加入课程
                </el-button>
              </div>
              <el-button :icon="Lock" type="danger" size="large" plain disabled v-else>
                课程已关闭
              </el-button>
            </div>
          </el-main>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
  <!--  小组添加框-->
  <el-dialog
      v-model="creatVisible"
      title="创建我的小组"
      width="60%"
      :before-close="handleClose"
  >
    <el-form :model="groupInfo" label-width="auto">
      <el-form-item label="小组名称" required="true">
        <el-input v-model="groupInfo.name" placeholder="请输入不超过十五个字符" :maxlength="15"/>
      </el-form-item>
      <el-form-item label="小组成员数量" required="true">
        <el-input-number v-model="groupInfo.capacity" :min="1" :max="15"/>
      </el-form-item>
      <el-form-item label="小组简介">
        <el-input v-model="groupInfo.description" type="textarea" :max="500"
                  placeholder="简要介绍一下你的小组，别忘了附上联系方式..."/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearTeam">取消创建</el-button>
        <el-button type="primary" @click="addTeam">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-divider/>
    </el-col>
  </el-row>
  <!--  详情分页 -->
  <el-row>
    <el-col :span="20" :offset="2">
      <el-tabs type="border-card" class="tabs" style="border-radius: 10px;min-height: 300px;margin-bottom: 20px">
        <el-tab-pane label="任务">
          <homework/>
        </el-tab-pane>
        <el-tab-pane label="通知">
          <el-empty description="暂无通知"/>
        </el-tab-pane>
        <el-tab-pane label="队伍">
          <el-row class="filter-team">
            <el-col :span="8">
              <el-input
                  v-model="inputText"
                  size="large"
                  placeholder="搜索小队名称"
                  :suffix-icon="Search"
                  @change="queryTeam"
              />
            </el-col>
            <el-col :span="4">
              <el-check-tag :checked="ifPossible" @change="choosePossible" class="possible">仅看可加入的队伍
              </el-check-tag>
            </el-col>
          </el-row>
          <el-row class="outside">
            <el-col
                v-for="(o, index) in 5"
                :key="o"
                :offset="0"
            >
              <course-team/>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref, onActivated, reactive} from 'vue'
import {Connection, DocumentDelete, Lock, Plus, Position, Search, Pointer} from '@element-plus/icons-vue'
import CourseTeam from "../components/course-team.vue";
import Homework from "../components/homework.vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import {useUserStore} from "../stores/user.js";

const router = useRouter()
const route = useRoute()
const user = useUserStore().getUser()

const userInfo = ref({})
const selected = ref(true)
const courseInfo = ref({})
const inputText = ref('')
const hasTeam = ref(false)
const teamNumber = ref(-1)
const teamId = ref("")
const ifPossible = ref(false)
const groupInfo = reactive({
  name: '',
  leaderId: '',
  organName: '',
  description: '',
  type: '',
  capacity: 0,
  courseId: '',
  members: [],
  tasks: [],
  applications: [],
})
const creatVisible = ref(false)
const clearTeam = () => {
  groupInfo.name = ''
  groupInfo.capacity = 0
  groupInfo.description = ''
  creatVisible.value = false
}
const handleClose = (done) => {
  clearTeam()
  done()
}

onActivated(async () => {
  document.documentElement.scrollTop = 0;
  let id = route.query.id
  selected.value = route.query.selected == 'true'
  await axios.get(`http://localhost:11300/course?id=${id}`).then(res => {
    courseInfo.value = res.data
  }).catch(error => {
    alert(error)
  })

  await axios.get(`http://localhost:11300/user?id=${user.id}`).then(
      res => {
        userInfo.value = res.data
      }
  ).catch(err => {
    alert(err)
  })

  teamNumber.value = courseInfo.value.groups.length

  for (let i = 0, len = userInfo.value.groups.length; i < len; i++) {
    let tmp={}
    await axios.get(`http://localhost:11300/group?id=${userInfo.value.groups[i]}`).then(
        res => {
          tmp = res.data
        }
    ).catch(err => {
      alert(err)
    })
    console.log(tmp.courseId)
    console.log(courseInfo.value.id)
    if (tmp.courseId == courseInfo.value.id ) {
      hasTeam.value = true
      teamId.value = tmp.id
      groupInfo.members=tmp.members
      groupInfo.name=tmp.name
      groupInfo.capacity=tmp.capacity
      groupInfo.id=tmp.id
      groupInfo.description=tmp.description
      groupInfo.leaderId=tmp.leaderId
      break
    }

  }

  if (!hasTeam.value) {
    groupInfo.organName = courseInfo.value.name
    groupInfo.leaderId = user.id
    groupInfo.type = 'course'
    groupInfo.courseId = courseInfo.value.id
    groupInfo.members.push(user.id)
  }
})


const queryTeam = () => {

}

const addTeam = async () => {
  await axios.post('http://localhost:11300/group', groupInfo).then(
      res => {
        hasTeam.value = true
        groupInfo.id = res.data
        console.log(groupInfo)
      }
  ).catch(err => {
    alert(err)
  })
  creatVisible.value = false
}
let dropOut = () => {

}

let getTeamId = () => {

}
let choosePossible = () => {
  ifPossible.value = !ifPossible.value
}

let createTeam = () => {
  creatVisible.value = true
}
let findTeam = () => {

}
</script>

<style scoped>
.filter-team {
  margin: 5px 5px 20px;
}

.box-card {
  margin-top: 10px;
}

.image {
  border-radius: 10px;
  height: 230px;
}

.text {
  font-size: 25px;
  margin-top: 0;
  margin-bottom: 5px;
  margin-left: 5px;
  color: #242424;
  font-weight: bolder;
}

.description {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: #FAF6F0;
  border-style: none;
  border-radius: 10px;
  color: #2C3639
}

.possible {
  height: 25px;
  margin-left: 15px;
  line-height: 25px
}

</style>