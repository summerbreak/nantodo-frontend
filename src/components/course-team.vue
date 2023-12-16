<template>
  <el-descriptions
      class="team-description"
      direction="vertical"
      :column="3"
      :size="'default'"
      border
  >
    <el-descriptions-item min-width="25%" width="25%">
      <template #label>
        <div class="cell-item">
          小组名称
        </div>
      </template>
      <el-text>{{ props.groupInfo.name }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            简介
          </div>
        </template>
        <el-text truncated>{{ props.groupInfo.description }}</el-text>
      </el-descriptions-item>
    <el-descriptions-item min-width="35%" width="35%">
      <template #label>
        <div class="cell-item">
          组长
        </div>
      </template>
      <el-text>{{ props.groupInfo.leaderName }}</el-text>
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小组人数
        </div>
      </template>
      <el-text>{{ props.groupInfo.members.length }} / {{ props.groupInfo.capacity }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小组成员
        </div>
      </template>
      <el-text>{{ props.groupInfo.membersName }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item class-name="join-team" v-if="join">
      <template #label>
        <div class="cell-item">
          小组状态
        </div>
      </template>
      <div @click="$emit('applyIt',props.groupInfo.id)">点击申请加入</div>
    </el-descriptions-item>
    <el-descriptions-item class-name="disable-join-team" v-else>
      <template #label>
        <div class="cell-item">
          小组状态
        </div>
      </template>
      <div >小组成员已满</div>
    </el-descriptions-item>
  </el-descriptions>
  <el-divider border-style="dashed"/>
</template>

<script setup>
import {ref, onMounted, onActivated} from 'vue'
import axios from "axios";

const props = defineProps(['groupInfo'])
const size = ref('')
const join = ref(true)
onActivated(() => {
  join.value = props.groupInfo.members.length < props.groupInfo.capacity;
  console.log(join.value)
})

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
  background-color: #FFFAF0;
  color: #82CD47;
}

:deep(.disable-join-team:hover) {
  cursor: not-allowed;
  background-color: crimson;
  color: #FFFAF0;
}

</style>