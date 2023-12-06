<template>
  <Calendar ref="calendar" :attributes="attrs" expanded >
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
  display: block;
  margin: auto;
  background-color: #3498db; /* 蓝色背景色 */
  color: #ffffff; /* 文字颜色为白色 */
  font-weight: bold;
  padding: 10px 20px; /* 调整内边距，根据需要进行调整 */
  border: none;
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer;
}

.mybutton:hover {
  background-color: #2980b9; /* 鼠标悬停时的背景颜色 */
}
</style>