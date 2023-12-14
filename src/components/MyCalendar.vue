<template>
  <Calendar ref="calendar" :attributes="attrs" expanded transparent borderless>
    <template #footer>
      <div>
        <button
          class="mybutton"
          @click="moveToday"
        >
          Today
        </button>
      </div>
    </template>
  </Calendar>
</template>

<script setup>
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
import { ref,reactive } from "vue";
import axios from "axios";
import { onMounted} from "vue";
import { useUserStore } from '../stores/user.js'
const userStore = useUserStore();
const attrs = reactive([
  {
    key: "v0Day",
    dates: new Date(),
    highlight: true,
    popover: {
      label: "美好的一天！要开心呦！",
    },
  },
  {
    key: "V1Day",
    popover: {
      label: "完成task",
    },
    highlight: {
      color: 'orange',
      fillMode: 'light',
    },
    backgroundColor: "#FFA500",
    dates: new Date(2023, 11, 13),
  },
]);
const tableData = reactive([]);
const calendar = ref(null);
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

function editTask(){
  for (let i = 0; i < tableData.length; i++) {
    let date = new Date(tableData[i].deadline);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let key = "v" + i+2 + "Day";
    attrs.push({
      key: key,
      dates: new Date(year, month, day),
      highlight: {
      color: 'orange',
      fillMode: 'light',
      },
      popover: {
        label: tableData[i].title,
      },
    });
  }
  console.log(attrs);

}

function moveToday() {
  calendar.value.move(new Date());
}
</script>

<style scoped>
.mybutton{
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
  background-color: #2980b9; /* 鼠标悬停时的背景颜色 */
}
</style>

<style>
.vc-day{
  min-height: 22px;
}
</style>