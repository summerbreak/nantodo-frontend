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
                <div v-if="selected" :key="ref">
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
                <el-button :icon="Pointer" type="success" size="large" plain v-else @click="attendCourse">
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
      width="40%"
      :before-close="handleClose"
  >
    <el-form :model="groupInfo" label-width="auto" :key="fresh">
      <el-form-item label="小组名称" required="true">
        <el-input v-model="groupInfo.name" placeholder="请输入不超过十五个字符" :maxlength="15"/>
      </el-form-item>
      <el-form-item label="小组成员数量" required="true">
        <el-input-number v-model="groupInfo.capacity" :min="1" :max="15"/>
      </el-form-item>
      <el-form-item label="小组简介">
        <el-input v-model="groupInfo.description" type="textarea" :max="50" resize="none"
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
        <el-tab-pane label="作业">
          <homework :info="route.query.id"/>
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
          <el-row class="outside" :key="fresh">
            <el-col
                v-for="(o, index) in showTeam"
                :key="index"
                :offset="0"
            >
              <course-team :group-info="o"/>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref, onActivated, reactive, onUpdated} from 'vue'
import {Connection, DocumentDelete, Lock, Plus, Position, Search, Pointer} from '@element-plus/icons-vue'
import CourseTeam from "../components/course-team.vue";
import Homework from "../components/homework.vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import {useUserStore} from "../stores/user.js";
import {ElMessage, ElMessageBox} from "element-plus";

const router = useRouter()
const route = useRoute()
const user = useUserStore().getUser()
const fresh = ref(0)
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

})
const allTeam = ref([])
const showTeam = ref([])
const creatVisible = ref(false)
const clearTeam = () => {
  groupInfo.name = ''
  groupInfo.capacity = 4
  groupInfo.description = ''
  creatVisible.value = false
}
const handleClose = (done) => {
  clearTeam()
  done()
}

onActivated(async () => {
  fresh.value += 1
  selected.value = false
  hasTeam.value = false
  document.documentElement.scrollTop = 0;
  let id = route.query.id
  selected.value = route.query.selected == 'true'
  await axios.get(`http://localhost:8080/course?id=${id}`).then(res => {
    courseInfo.value = res.data
  }).catch(error => {
    alert(error)
  })
  allTeam.value.length = 0
  showTeam.value.length = 0
  await axios.get(`http://localhost:8080/course/allGroup?courseId=${id}`).then(async res => {
    let allGroups = res.data
    for (let i = 0, len = allGroups.length; i < len; i++) {
      allTeam.value.push(allGroups[i])
      allTeam.value[i]["leaderName"] = ''
      allTeam.value[i]["membersName"] = ''
      console.log(allGroups[i])
      await axios.get(`http://localhost:8080/user?id=${allGroups[i].leaderId}`).then(
          res => {
            allTeam.value[i].leaderName = res.data.name
          }
      )
      allGroups[i].members.map(async item => {
        await axios.get(`http://localhost:8080/user?id=${item}`).then(
            res => {
              if (allTeam.value[i].membersName.length > 0) {
                allTeam.value[i].membersName += '，'
              }
              allTeam.value[i].membersName += res.data.name
            }
        )
      })
    }
  }).catch(error => {
    alert(error)
  })
  showTeam.value.length = 0
  showTeam.value.splice(0, 0, ...allTeam.value)
  await axios.get(`http://localhost:8080/user?id=${user.id}`).then(
      res => {
        userInfo.value = res.data
      }
  ).catch(err => {
    alert(err)
  })

  teamNumber.value = allTeam.value.length

  for (let i = 0, len = userInfo.value.groups.length; i < len; i++) {
    let tmp = {}
    await axios.get(`http://localhost:8080/group?id=${userInfo.value.groups[i]}`).then(
        res => {
          tmp = res.data
        }
    ).catch(err => {
      alert(err)
    })

    if (tmp.courseId == courseInfo.value.id) {
      hasTeam.value = true
      teamId.value = tmp.id
      groupInfo.members = tmp.members
      groupInfo.name = tmp.name
      groupInfo.capacity = tmp.capacity
      groupInfo.id = tmp.id
      groupInfo.description = tmp.description
      groupInfo.leaderId = tmp.leaderId
      break
    } else {
      clearTeam()
    }

  }

})


const addTeam = async () => {
  groupInfo.organName = courseInfo.value.name
  groupInfo.leaderId = user.id
  groupInfo.type = 'course'
  groupInfo.courseId = courseInfo.value.id
  groupInfo.members.length = 0
  groupInfo.tasks.length = 0
  groupInfo.applications.length = 0
  await axios.post('http://localhost:8080/group', groupInfo).then(
      res => {
        hasTeam.value = true
        groupInfo.id = res.data
        courseInfo.value.groups.push(groupInfo.id)
      }
  ).catch(err => {
    alert(err)
  })
  creatVisible.value = false
}
const dropOut = () => {
  axios.get(`http://localhost:8080/user?id=${user.id}`).then(
      res => {
        userInfo.value = res.data
      }
  ).catch(err => {
    alert(err)
  })
  if (hasTeam.value) {
    ElMessageBox.alert('您已参加了小组，暂时无法退课', '提示消息', {
      confirmButtonText: '好的',
      callback: (action) => {
        ElMessage({
          type: 'warning',
          message: `退出课程失败`,
        })
      },
    })
  } else {
    userInfo.value.courses = userInfo.value.courses.filter(item => item != courseInfo.value.id)
    console.log(userInfo.value.courses)
    axios.put(`http://localhost:8080/user?id=${user.id}`, userInfo.value).then(
        res => {
          console.log(res)
          selected.value = false
          ElMessage({
            message: `成功退出${courseInfo.value.name}`,
            type: 'success',
          })
        }
    ).catch(err => {
      ElMessage({
        message: `出错了！`,
        type: 'warning',
      })
    })
  }


}

let getTeamId = () => {

}

const queryTeam = async () => {
  let text = inputText.value.slice(0)
  text = text.split("");
  let str = "(.*?)";
  showTeam.value.length = 0;
  let regStr = str + text.join(str) + str;
  let reg = RegExp(regStr, "i"); // 以mh为例生成的正则表达式为/(.*?)m(.*?)h(.*?)/i
  allTeam.value.map(async item => {
        let leaderName = ''
        await axios.get(`http://localhost:8080/user?id=${item.leaderId}`).then(
            res => {
              leaderName = res.data.name
              console.log(leaderName)
            }
        ).catch(err => {
          leaderName = '不存在'
        })
        if (reg.test(item.name) || reg.test(leaderName)) {
          if (!ifPossible) {
            showTeam.value.push(item);
          } else if (item.members.length < item.capacity) {
            showTeam.value.push(item);
          }
        }
      }
  )
}
let choosePossible = () => {
  ifPossible.value = !ifPossible.value
  if (ifPossible.value) {
    let tmp = showTeam.value.concat()
    tmp = tmp.filter(item => item.members.length < item.capacity)
    showTeam.value.length = 0
    showTeam.value.splice(0, 0, ...tmp)
  } else {
    queryTeam()
  }
}

let createTeam = () => {
  creatVisible.value = true
}
const findTeam = () => {

}

const attendCourse = () => {
  userInfo.value.courses.push(courseInfo.value.id)
  axios.put(`http://localhost:8080/user?id=${userInfo.value.id}`, userInfo.value).then(res => {
    selected.value = true
    ElMessage({
      message: `成功加入${courseInfo.value.name}`,
      type: 'success',
    })
  }).catch(err => {
    ElMessage({
      message: `出错了！`,
      type: 'warning',
    })
  })
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