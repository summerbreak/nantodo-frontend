<template>
  <div style="position: relative">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="first"
        ><template #label><span class="my-label">未完成事项</span></template>
        <el-scrollbar class="myscroll" :height="heg">
          <el-empty description="暂无任务" v-if="Undone.length == 0" />
          <el-row v-if="filteredUndone.length != 0">
            <el-col v-for="item in filteredUndone" :key="item.id" :span="12">
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
          <el-empty description="暂无任务" v-if="Done.length == 0" />
          <el-row v-if="filteredDone.length != 0">
            <el-col v-for="item in filteredDone" :key="item" :span="12">
              <finished-card
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
    <div style="position: absolute; right: 450px; top: 5px">
      <el-tooltip
        class="box-item"
        content="筛选星标任务"
        placement="top-start"
        effect="light"
      >
        <el-button :type="filterStar ? 'warning':''" :icon="Star"  @click="filterSTask"/>
      </el-tooltip>

    </div>
    <div style="position: absolute; right: 200px; top: 5px">
      <el-select v-model="value" class="m-2" placeholder="选择排序方式" size="large" @change="selectChanged" style="width:80%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
  </el-select>
    </div>
  </div>
</template>
    
<script setup>
import { onMounted , watch, computed} from "vue";
import {Star} from "@element-plus/icons-vue";
import axios from "axios";
import { ref , reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useDonelistStore } from '../stores/donelist.js';
import { useUserStore } from '../stores/user.js';

const userStore = useUserStore();

const value = ref('根据发布时间排序')

const options = [
  {
    value: '根据截止日期排序',
    label: '根据截止日期排序',
  },
  {
    value: '根据发布时间排序',
    label: '根据发布时间排序',
  },
]

const inputText = ref("");
const activeName = ref("first");
const filterStar = ref(false);
const heg = ref("");
const querySearch = () => {
  console.log(inputText);
};


const tableData = reactive([]);
const Done = reactive([]);
const Undone = reactive([]);
const store = useDonelistStore();
const doneList = reactive({
  total:0,
  done:0 
});

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
  let myUserid = userStore.getUser().id;
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

function selectChanged(value) {
	if(value=="根据截止日期排序"){
    console.log(value);
    //根据deadline日期顺序排序Done和Undone
    Done.sort((a, b) => {
      // 将字符串日期转换为 Date 对象进行比较
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);

      // 返回比较结果，负数表示 a 在 b 前面，正数表示 a 在 b 后面
      return  dateA.getTime() - dateB.getTime();
    });
    console.log(Undone);
    Undone.sort((a, b) => {
      // 将字符串日期转换为 Date 对象进行比较
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);

      // 返回比较结果，负数表示 a 在 b 前面，正数表示 a 在 b 后面
      return  dateA.getTime() - dateB.getTime();
    });
    console.log(Undone);
  }else{
    getAllTasks();
  }
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
  doneList.total = tableData.length;
  doneList.done = Done.length;
  store.change.total = tableData.length;
  store.change.done = Done.length;
  console.log('todolist store', store.change)
  saveData();
}

const filteredDone = computed(() => {
  if (inputText.value === '') {
    return Done; // 搜索关键词为空时返回整个电影数组
  } else {
    return Done.filter(Donetask =>
      Donetask.title.toLowerCase().includes(inputText.value.toLowerCase())
    );
  }
});

const filteredUndone = computed(() => {
  if (inputText.value === '') {
    return Undone; // 搜索关键词为空时返回整个电影数组
  } else {
    return Undone.filter(Undonetask =>
      Undonetask.title.toLowerCase().includes(inputText.value.toLowerCase())
    );
  }
});


function saveData() {
  // 将数据保存到localStorage中
  localStorage.setItem('doneList', JSON.stringify(doneList));
};

function filterSTask(){
  //获取所有任务
  let myUserid = userStore.getUser().id;
  axios.get(`http://localhost:8080/task/all?userId=${myUserid}`).then((res) => {
    tableData.length = 0;
    tableData.splice(0, 0, ...res.data);
    console.log(tableData);
    filterStar.value = !filterStar.value;
    if(filterStar.value){
    //筛选出starred的任务
    Done.length = 0;
    Undone.length = 0;
    for(let item of tableData){
      if(item.starred == true){
        if(item.done == true){
          Done.push(item);
        }
        else{
          Undone.push(item);
        }
      }
    }
  }
  else{
    splitTask();
  }
  }),
  (err) => {
    console.log(err);
  };
  
}
</script>

<style>
.el-button {
  height: 40px !important;
}
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

