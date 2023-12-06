<template>
  <div class="mainPage">
    <div class="left-column">
      <div class="welcome-box">
        <span class="welcome">欢迎来到南土豆!</span>
        <p class="subtitle">你好,{{ userName }}。欢迎回来!</p>
      </div>
      <div class="todoList">
        <!--tolist展示与搜索-->
        <todoList />
      </div>
    </div>
    <div class="right-column">
      <div class="top-box">
        <div class="box2">
          <!--参加小组与创建新todo-->
          <groupCard />
        </div>
        <!--图表统计完成事务-->
        <div class="sta-chart">
          <StaChart />
        </div>
      </div>

      <div class="calender">
        <!--日历-->
        <div class="el_cal">
          <MyCalendar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "用户",
      calender_value: new Date(),
    };
  },
  methods: {},
};
</script>

<style scoped>
.sta-chart{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.top-box {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fffaf0;
  border-radius: 8px;
  padding: 20px;
  flex: 5;
}
.mainPage {
  display: flex;
}
.calender {
  flex: 5;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fffaf0;
  border-radius: 8px;
  margin-top: 10px;
  height: 500px;
  padding: 10px;
}
.left-column {
  flex: 6.5;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
  padding: 20px;
  background-color: #fffaf0;
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 15%;
  margin-right: 10px;
}
.welcome {
  font-size: 40px;
  font-family: "Dengxian", sans-serif;
}
.right-column {
  display:flex;
  flex-direction: column;
  flex: 3.5;
  margin-right: 15%;
  margin-top: 10px;
}
.box2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex: 1;
  box-sizing: border-box;
  margin-bottom: 0;
}
.subtitle {
  color: #666;
  font-size: 1.2em;
  margin-left: 3%;
  margin-top: 0%;
  font-family: "STKaiti", sans-serif;
}
</style>