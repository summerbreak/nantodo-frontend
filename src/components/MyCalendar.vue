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
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";
import { ref } from "vue";

const attrs = ref([
  {
    key: "v0Day",
    dates: new Date(),
    highlight: true,
    dot: true,
    popover: {
      label: "美好的一天！要开心呦！",
    },
  },
  {
    key: "V1Day",
    popover: {
      label: "完成task",
    },
    dot: {
      style: {
        backgroundColor: "#FB5A56",
      },
    },
    dates: new Date(2023, 11, 13),
  },
]);

const calendar = ref(null);

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
  min-height: 30px;
}
</style>