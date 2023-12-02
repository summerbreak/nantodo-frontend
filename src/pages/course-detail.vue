<template>
<!--  <el-scrollbar max-height="1000px" style="margin-bottom: 0;margin-top: 0">-->
  <el-row>
      <el-col :span="20" :offset="2">
        <el-card class="box-card">
          <el-container>
            <el-aside width="40%">
              <el-image
                  :src="url"
                  class="image"
                  :fit="'cover'"
              />
            </el-aside>
            <el-main style="padding: 5px;margin-top: 0;margin-left: 10px">
              <el-text line-clamp="1" class="text">{{ name }}</el-text>
              <el-card shadow="never"
                       class="description">
                <el-text size="large">教师：67</el-text>
                <br/>
                <el-row>
                  <el-col :span="5">
                    <el-text size="large">学期：2023秋</el-text>
                  </el-col>
                  <el-col :span="8">
                    <el-text size="large">授课年级：2023</el-text>
                  </el-col>
                </el-row>
                <el-text size="large" style="color: #82CD47">小队数目：60（20支小队正在招募中）</el-text>
              </el-card>
              <div style="margin-top: 20px">
              <el-button-group  size="large" v-if="hasTeam">
              <el-button :icon="Plus" type="warning" plain @click="createTeam">
                创建我的小队
              </el-button>
                <el-button type="warning" plain @click="findTeam">
                  通过邀请码加入小队<el-icon class="el-icon--right"><Connection /></el-icon>
                </el-button>
              </el-button-group>
              <el-button :icon="Position" type="warning" plain @click="createTeam" size="large" v-else>
                查看我的小队
              </el-button>
              </div>
            </el-main>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-divider/>
      </el-col>
    </el-row>
<!--  </el-scrollbar>-->
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {Plus, Position,Connection} from '@element-plus/icons-vue'

const props = defineProps(['url', 'name', 'teacher', 'index'])
const url = "https://picdm.sunbangyan.cn/2023/12/01/dcb092f15f5649cc20185ce03e779f90.jpeg"
const name = "软件工程与计算"
const activeDescription = ref(['1'])
const hasTeam=ref(true)

let createTeam = ()=>{

}
let findTeam = ()=>{

}
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}

.image {
  border-radius: 10px;
  height: 230px;
}

.text {
  font-size: 25px;
  margin-top: 0;
  margin-bottom: 5px;
  margin-left: 5px;
  color: #242424;
  font-weight: bolder;
}

.description {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: #FAF6F0;
  border-style: none;
  border-radius: 10px;
  color: #2C3639
}
</style>