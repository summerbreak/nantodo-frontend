<template>
  <div class="demo-progress">
    <div class="progress-container">
      <el-progress type="dashboard" :percentage="80" >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">Progressing</span>
        </template>
      </el-progress>
    </div>
    <p class="remaining-items">
      还剩 <span class="remaining-number">10</span> 项待办
    </p>
  </div>
</template>
  
  <script lang="ts" setup>
import { Check } from "@element-plus/icons-vue";
</script>
  
  <style scoped>
.demo-progress {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.remaining-items {
  font-size: 18px; /* 调整文本的大小 */
}

.remaining-number {
  font-size: 24px; /* 调整剩余数字的大小 */
  color: #f00; /* 将剩余数字标红 */
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>