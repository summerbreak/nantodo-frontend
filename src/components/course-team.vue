<template>
  <el-descriptions
      class="team-description"
      direction="vertical"
      :column="3"
      :size="'default'"
      border
  >
    <el-descriptions-item min-width="150px" width="150px">
      <template #label>
        <div class="cell-item">
          小组名称
        </div>
      </template>
      <el-text>{{props.groupInfo.name}}</el-text>
    </el-descriptions-item>
    <el-descriptions-item min-width="300px" width="300px">
      <template #label>
        <div class="cell-item">
          队长
        </div>
      </template>
      <el-text>{{props.groupInfo.leaderName}}</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          简介
        </div>
      </template>
      <el-text truncated>{{props.groupInfo.description}}</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小队人数
        </div>
      </template>
      <el-text>{{props.groupInfo.members.length}} / {{ props.groupInfo.capacity }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小队成员
        </div>
      </template>
      <el-text>{{props.groupInfo.membersName}}</el-text>
    </el-descriptions-item>
    <el-descriptions-item class-name="join-team">
      <template #label>
        <div class="cell-item">
          小队状态
        </div>
      </template>
      <div @click="joinTeam">点击申请加入</div>
    </el-descriptions-item>
  </el-descriptions>
  <el-divider border-style="dashed"/>
</template>

<script setup>
import {ref, onMounted, onActivated} from 'vue'
import axios from "axios";

const props = defineProps(['groupInfo'])
const size = ref('')
const leader = ref('')
const member = ref('')
let joinTeam = () => {
}

</script>

<style scoped>
.team-description {
  margin: 5px;
}

.cell-item {
  font-weight: bolder;
}

:deep(.join-team) {
  text-decoration-line: underline;
}

:deep(.join-team:hover) {
  cursor: pointer;
  background-color: #82CD47;
  color: #FFFAF0;
}

</style>