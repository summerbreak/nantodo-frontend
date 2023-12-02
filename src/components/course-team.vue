<template>
  <el-descriptions
      class="team-description"
      :column="3"
      :size="'default'"
      border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小组名称
        </div>
      </template>
      <el-text>kooriookami</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          队长
        </div>
      </template>
      <el-text>空调承太郎</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          联系方式
        </div>
      </template>
      <el-text>18100000000</el-text>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          小队人数
        </div>
      </template>
      <el-text>3 / 4</el-text>
    </el-descriptions-item>
    <el-descriptions-item >
      <template #label>
        <div class="cell-item">
          小队成员
        </div>
      </template>
      <el-text>空调承太郎，花京院典明，乔纳森·乔斯达</el-text>
    </el-descriptions-item>
    <el-descriptions-item class-name="join-team" >
      <template #label>
        <div class="cell-item">
          小队状态
        </div>
      </template>
      <div @click="joinTeam">点击申请加入</div>
    </el-descriptions-item>
  </el-descriptions>
  <el-divider border-style="dashed" />
</template>

<script setup>
import {ref, onMounted} from 'vue'

const size = ref('')
let joinTeam = ()=>{
  console.log(1111)
}
</script>

<style scoped>
.team-description{
  margin: 5px;
}
.cell-item {
  font-weight: bolder;
  display: flex;
  align-items: center;
}
:deep(.join-team){
  text-decoration-line: underline;
}
:deep(.join-team:hover){
  background-color: #82CD47;
  color: #FFFAF0;
}

</style>