<template>
  <div class="total">
    <el-card shadow="hover" :body-style="{ padding: '0px'}" @click="gotoDetails" style="border-radius: 3%">
      <el-image
          :src="props.courseInfo.url"
          class="image"
          :fit="'cover'"
      />
      <div class="text">
        <el-text tag="b" size="large" style="font-size: 16px;color: #1a1a1a">{{ props.courseInfo.name }}</el-text>
        <br/>
        <el-text class="t">
          <el-icon>
            <Avatar/>
          </el-icon>
          任课老师：{{ props.courseInfo.teacher }}
        </el-text>
      </div>
      <el-row class="grid-bottom">
        <el-col :span="8" style="padding-left: 10px">
          <el-text class="mx-1" style="font-size: 13px;padding-left: 2px" type="success">
            <el-icon size="13px">
              <Check/>
            </el-icon>
            开放加入
          </el-text>
        </el-col>
        <el-col :span="6" :offset="10" style="text-align: right;padding-right: 10px">
          <el-text class="t" type="info">{{ props.courseInfo.grade }}级</el-text>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRouter} from 'vue-router'
import {Check, Avatar} from '@element-plus/icons-vue'
import {ref, onMounted} from 'vue'


const props = defineProps(['courseInfo'])
const url = "https://picdm.sunbangyan.cn/2023/12/01/dcb092f15f5649cc20185ce03e779f90.jpeg"
const router = useRouter()

onMounted(() => {
  // console.log(router.currentRoute.value)
})

function gotoDetails() {
  router.push({path: "/course-detail", query: {id: props.courseInfo.id}})
}


</script>


<style scoped>
.total {
  :hover {
    cursor: pointer;
  }

  padding: 20px;
}

.image {
  width: 100%;
  display: block;
  height: 140px;
}

.t {
  font-size: 13px;
  color: #999;
}

.text {
  padding: 10px 12px 10px;
}

.grid-bottom {
  padding: 0;
  margin-top: -15px;
  margin-bottom: 8px;
}
</style>