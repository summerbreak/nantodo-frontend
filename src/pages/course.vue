<template>
<!--  <el-scrollbar max-height="1000px" style="margin-bottom: 0;margin-top: 0">-->
    <el-row style="margin-top: 10px">
      <el-col>
        <el-text tag="ins" class="title">我的课程</el-text>
      </el-col>
    </el-row>
  <invitation-button/>
    <el-row class="outside">
      <el-col
          v-for="(o, index) in allCourses"
          :key="index"
          :span="6"
          :offset="0"
      >
        <course-grid :courseInfo="o"/>
      </el-col>
    </el-row>
    <el-row style="margin-right: 100px;margin-bottom: 10px">
      <el-col :span="6">
        <el-text tag="ins" class="title">全部课程</el-text>
      </el-col>
      <el-col :span="12" :offset="6">
        <course-search/>
      </el-col>
    </el-row>
    <el-scrollbar max-height="600px" style="margin-bottom: 0;margin-top: 0">
      <el-row class="outside">
        <el-col
            v-for="(o, index) in allCourses"
            :key="index"
            :span="6"
            :offset="0"
        >
          <course-grid :courseInfo="o"/>
        </el-col>
      </el-row>
    </el-scrollbar>
<!--  </el-scrollbar>-->
</template>
<script setup>
import {ref,onActivated} from "vue";
import CourseSearch from "../components/course-search.vue";
import CourseGrid from "../components/course-grid.vue";
import axios from "axios";
import InvitationButton from "../components/invitation-button.vue";

const allCourses=ref([])


onActivated(async () => {
  await axios.get('http://localhost:11300/course/allCourse').then(
      res => {
        allCourses.value = []
        for (let i=0;i<res.data.length;i++) {
          console.log(res.data[i])
          allCourses.value.push(res.data[i])
        }
      }
  )
  console.log(allCourses.value)
})
</script>
<style scoped>
.title {
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bolder;
  color: #884A39;
}

.outside {
  margin: 0 140px 5px;
  padding: 0;
}
</style>