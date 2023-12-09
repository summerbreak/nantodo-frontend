<template>
    <div v-if="isOpen">
      <el-button-group size="large" v-if="hasTeam">
        <el-button :icon="Position" type="warning" plain @click="createTeam">
          查看我的小队
        </el-button>
        <el-button type="warning" plain @click="getTeamId">
          复制邀请码
          <el-icon class="el-icon--right">
            <Connection/>
          </el-icon>
        </el-button>
      </el-button-group>
      <el-button-group size="large" v-else>
        <el-button :icon="Plus" type="warning" plain @click="createTeam">
          创建我的小队
        </el-button>
        <el-button type="warning" plain @click="findTeam">
          通过邀请码加入小队
          <el-icon class="el-icon--right">
            <Connection/>
          </el-icon>
        </el-button>
      </el-button-group>
      <el-button :icon="DocumentDelete" type="danger" plain @click="dropOut" size="large"
                 style="margin-left: 20px">
        退出课程
      </el-button>
    </div>
    <el-button :icon="Lock" type="danger" size="large" plain disabled v-else>
      课程已关闭
    </el-button>
</template>

<script setup>
import {Connection, DocumentDelete, Lock, Plus, Position} from "@element-plus/icons-vue";
import { ref} from "vue";

const props = defineProps(['hasTeam', 'isOpen'])
const show = ref(false)

let createTeam = () => {

}
let findTeam = () => {

}

</script>

<style scoped>

</style>