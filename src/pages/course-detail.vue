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
              <course-button-group :has-team="hasTeam" :is-open="courseInfo.open" v-show="selected"/>
              <el-button type="success" size="large" plain v-show="selected===false">
                加入课程
              </el-button>
            </div>
          </el-main>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
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
import {ref, onActivated} from 'vue'
import {Search} from '@element-plus/icons-vue'
import CourseTeam from "../components/course-team.vue";
import Homework from "../components/homework.vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import CourseButtonGroup from "../components/course-button-group.vue";

const router = useRouter()
const route = useRoute()

const selected = ref(true)
const courseInfo = ref({})
const inputText = ref('')
const hasTeam = ref(false)
const teamNumber = ref(-1)
const ifPossible = ref(false)
onActivated(async () => {
  document.documentElement.scrollTop = 0;
  let id = route.query.id
  selected.value = route.query.selected
  await axios.get(`http://localhost:11300/course?id=${id}`).then(res => {
    courseInfo.value = res.data
  }).catch(error => {
    alert(error)
  })
  teamNumber.value = courseInfo.value.groups.length
  console.log(courseInfo.value)
  console.log(selected.value)
})


let queryTeam = () => {

}

let dropOut = () => {

}

let getTeamId = () => {

}
let choosePossible = () => {
  ifPossible.value = !ifPossible.value
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