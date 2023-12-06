<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane name="first"
      ><template #label><span class="my-label">未完成事项</span></template>
      <el-scrollbar class="myscroll">
        <p v-for="item in tableData" :key="item.date" class="scrollbar-item">
          Date: {{ item.date }}, Name: {{ item.name }}, Address: {{ item.address }}
        </p>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane name="second"
      ><template #label><span class="my-label">已完成事项</span></template>
      <el-scrollbar class="myscroll">
        <p v-for="item in tableData" :key="item.date" class="scrollbar-item">
          Date: {{ item.date }}, Name: {{ item.name }}, Address: {{ item.address }}
        </p>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>
    
<script lang="ts" setup>
import Sortable from "sortablejs";
import { onMounted } from "vue";
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Cilly",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Linda",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Cilly",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Linda",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style>
.myscroll{
  height: 600px;
}
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
  background: #FAEBD7;
  color: var(--el-color-primary);
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

.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 50px;
  font-weight: 600;
}

/*去掉tabs底部的下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>

