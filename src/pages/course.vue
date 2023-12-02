<template>
<!--  <el-scrollbar max-height="1000px" style="margin-bottom: 0;margin-top: 0">-->
    <el-row style="margin-top: 10px">
      <el-col>
        <el-text tag="ins" class="title">我的课程</el-text>
      </el-col>
    </el-row>
    <el-row class="outside">
      <el-col
          v-for="(o, index) in 4"
          :key="o"
          :span="6"
          :offset="0"
      >
        <course-grid teacher="67" name="软件工程与计算"/>
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
            v-for="(o, index) in 24"
            :key="o"
            :span="6"
            :offset="0"
        >
          <course-grid teacher="67" name="软件工程与计算"/>
        </el-col>
      </el-row>
    </el-scrollbar>
<!--  </el-scrollbar>-->
</template>
<script setup>
import CourseSearch from "../components/course-search.vue";
import CourseGrid from "../components/course-grid.vue";


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
  margin: 0 100px 5px;
  padding: 0;
}
</style>