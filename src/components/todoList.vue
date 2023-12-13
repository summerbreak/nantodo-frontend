<template>
  <div style="position: relative">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="first"
        ><template #label><span class="my-label">未完成事项</span></template>
        <el-scrollbar class="myscroll" :height="heg">
          <el-empty description="最近暂无任务" v-if="Undone.length == 0" />
          <el-row v-if="Undone.length != 0">
            <el-col v-for="item in Undone" :key="item" :span="12">
              <task-card
                :title="item.title"
                :content="item.content"
                :releaseTime="item.releaseTime.toString()"
                :deadline="item.deadline.toString()"
                :starred="item.starred"
                :done="item.done"
                :id="item.id"
                :userId="item.userId"
              />
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="second"
        ><template #label><span class="my-label">已完成事项</span></template>
        <el-scrollbar class="myscroll" :height="heg">
          <el-empty description="最近暂无任务" v-if="Done.length == 0" />
          <el-row v-if="Done.length != 0">
            <el-col v-for="item in Done" :key="item" :span="12">
              <task-card
                :title="item.title"
                :content="item.content"
                :releaseTime="item.releaseTime.toString()"
                :deadline="item.deadline.toString()"
                :starred="item.starred"
                :done="item.done"
                :id="item.id"
                :userId="item.userId"
              />
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute; right: 0px; top: 5px">
      <el-input
        v-model="inputText"
        size="large"
        placeholder="任务搜索"
        :suffix-icon="Search"
        style="width: 80%"
        @change="querySearch"
      />
    </div>
  </div>
</template>
    
<script setup>
import { onMounted , watch} from "vue";
import axios from "axios";
import { ref , reactive } from "vue";
import { Search } from "@element-plus/icons-vue";

const inputText = ref("");
const activeName = ref("first");
const heg = ref("");
const querySearch = () => {
  console.log(inputText);
};


const tableData = reactive([]);
const Done = reactive([]);
const Undone = reactive([]);


onMounted(() => {
  heg.value = document.documentElement.clientHeight - 200 + "px";
  console.log(heg.value);
  getAllTasks();
});

watch(activeName, (newTab, oldTab) => {
  console.log(`Tab switched from ${oldTab} to ${newTab}`);
  // 在这里可以执行你希望在切换标签时触发的操作
  getAllTasks();
});

function getAllTasks() {
  //获取所有任务
  let myUserid = "657434b0b522ce741d1489bb";
  axios.get(`http://localhost:8080/task/all?userId=${myUserid}`).then((res) => {
    tableData.length = 0;
    tableData.splice(0, 0, ...res.data);
    console.log(tableData);
    splitTask();
  }),
  (err) => {
    console.log(err);
  };
}

function splitTask(){
  //根据done属性划分tableData为Done和Undone
  Done.length = 0;
  Undone.length = 0;
  for(let item of tableData){
    if(item.done == true){
      Done.push(item);
    }
    else{
      Undone.push(item);
    }
  }
}
</script>

<style>
.task-card {
  margin-left: 15px !important;
}
.my-label {
  font-size: 18px;
  font-weight: bold;
}

.el-tabs__item {
  display: flex;
  align-items: center;
}

.el-tabs__item.is-active {
  opacity: 1; /* 选中时完全不透明 */
}

.el-tabs__item:not(.is-active) {
  opacity: 0.5;
}

/*去掉tabs底部的下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>

