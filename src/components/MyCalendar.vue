<template>
  <Calendar ref="calendar" :attributes="attrs" expanded transparent borderless class="myCalendar">
    <template #footer>
      <div>
        <button class="mybutton" @click="moveToday">
          Today
        </button>
      </div>
    </template>
  </Calendar>
</template>

<script setup>
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
import { ref, reactive } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.js";
const attrs = reactive([
]);
const tableData = reactive([]);
const calendar = ref(null);
const userStore = useUserStore();
onMounted(() => {
  getAllTasks();
});

function getAllTasks() {
  //获取所有任务
  let myUserid = userStore.getUser().id;
  axios.get(`http://localhost:8080/task/all?userId=${myUserid}`).then((res) => {
    tableData.length = 0;
    tableData.splice(0, 0, ...res.data);
    console.log(tableData);
    editTask();
  }),
    (err) => {
      console.log(err);
    };
}

function editTask() {
  for (let i = 0; i < tableData.length + 1; i++) {
    if (i == 0) {
      attrs.push(
        {
          key: "v0Day",
          dates: new Date(),
          highlight: true,
          popover: {
            label: "美好的一天！要开心呦！",
          },
        })
    } else {
      let date = new Date(tableData[i - 1].deadline);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let key = "v" + i + "Day";
      if (year == new Date().getFullYear() && month == new Date().getMonth() && day == new Date().getDate()) {
        attrs.push({
          key: key,
          dates: new Date(year, month, day),
          highlight: true,
          popover: {
            label: tableData[i - 1].title,
          },
        });
      } else {
        attrs.push({
          key: key,
          dates: new Date(year, month, day),
          highlight: {
            color: 'orange',
            fillMode: 'light',
          },
          popover: {
            label: tableData[i - 1].title,
          },
        });
      }
    }


  }
  console.log('my', attrs);
}

function moveToday() {
  calendar.value.move(new Date());
}
</script>

<style scoped>
.mybutton {
  display: grid;
  margin: auto;
  background-color: #3498db;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mybutton:hover {
  background-color: #2980b9;
  /* 鼠标悬停时的背景颜色 */
}
</style>

<style>
.vc-day {
  min-height: 40px;
}
</style>