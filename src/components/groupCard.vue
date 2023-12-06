<template>
  <el-row>
    <el-col
      v-for="o in 2"
      :key="o"
      :span="8"
      class="container"
    >
      <el-card :body-style="{ padding: '0px' }" class="group-card">
        <div class="centered-container">
          <img src="src\assets\pic\welcomeIcon.png" class="image" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";

const currentDate = ref(new Date());
</script>
  
<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 让容器高度充满 el-card，以便使内容垂直居中 */
}
.centered-container:hover {
  cursor: pointer;
  background-color: yellow;
  border-radius: 8px;
}

.image {
  /* 可以添加其他样式，具体取决于你的需求 */
  width: 80%; /* 确保图像不超出其容器的宽度 */
  max-height: 100%; /* 确保图像不超出其容器的高度 */
}
.group-card {
  background-color: rgb(238, 221, 130);
}
</style>