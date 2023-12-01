<template>
  <course-search/>
  <el-row class="outside">
    <el-col
        v-for="(o, index) in 12"
        :key="o"
        :span="6"
        :offset="0"
    >
      <course-grid teacher="67"/>
    </el-col>
  </el-row>
</template>
<script setup>
import CourseSearch from "../components/course-search.vue";
import CourseGrid from "../components/course-grid.vue";

</script>
<style scoped>
.outside {
  margin-left: 100px;
  margin-right: 100px
}
</style>