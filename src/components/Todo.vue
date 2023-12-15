<template>
  <div class="mainPage">
    <div class="left-column">
      <!--tolist展示与搜索-->
      <todoList />
    </div>
    <div class="right-column">
      <div class="top-box">
        <!--最近浏览-->
        <groupCard />
      </div>
      <!-- 图表统计完成事务 -->
      <StaChart class="sta" />

      <div class="calender">
        <!--日历-->
        <MyCalendar />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "用户",
      calender_value: new Date(),
    };
  },
};
</script>

<style scoped>
.sta {
  flex: 3;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fffffa;
  border-radius: 8px;
  margin-top: 10px;
  height: 500px;
  --vc-text-sm: 18px;
}

.top-box {
  display: grid;
  ;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fffffa;
  border-radius: 8px;
  padding: 20px;
  flex: 3;
}

.mainPage {
  display: flex;
  padding: 10px;
  margin-left: 7%;
  margin-right: 7%;
}

.calender {
  flex: 4;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fffffa;
  border-radius: 8px;
  margin-top: 10px;
  height: 500px;
  --vc-text-sm: 18px;
  padding: 10px;
}

.left-column {
  flex: 6.5;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
  padding: 20px;
  background-color: #fffffa;
  border-radius: 8px;
  margin-right: 10px;
}

.welcome {
  font-size: 40px;
  font-family: "Dengxian", sans-serif;
}

.right-column {
  display: flex;
  flex-direction: column;
  flex: 3.5;
}
</style>