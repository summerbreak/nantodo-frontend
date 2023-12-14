<template>
  <div class="demo-progress">
    <div class="progress-container">
      <el-progress type="dashboard" :percentage="percent" >  
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">已完成</span>
        </template>
      </el-progress>
    </div>
    <p class="remaining-items">
      还剩 <span class="remaining-number">{{store.change.total-store.change.done}}</span> 项待办
    </p>
  </div>
</template>
  
<script setup>
  import { useDonelistStore } from '../stores/donelist.js';
  import { onMounted , watch, computed, ref , reactive} from "vue";
  const store = useDonelistStore();
  function loadData() {
    // 从localStorage加载数据
    // const data = JSON.parse(localStorage.getItem('doneList'));
    // if (data) {
    //   doneList.total = data.total;
    //   doneList.done = data.done;
    //   console.log(doneList);
    // } else {
    //   alert('No data found!');
    // }
  };
  onMounted(() => {
    loadData();
  });
  const percent = computed(() => {
    console.log(store.change);
    if (store.change.total==0){
      return 0;
    }
    return Math.round((store.change.done / store.change.total) * 100);
  });
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