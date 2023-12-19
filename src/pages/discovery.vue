<template>
    <div class="search">
        <div class="headline">寻找志同道合的伙伴</div>
        <el-input 
          v-model="searchValue"
          placeholder="搜你感兴趣的小组"
          class="search-input"
        >
          <template #prepend>
            <el-select v-model="searchType" placeholder=" 类别" style="width: 100px; height: 50px;">
              <el-option label="比赛竞技" value="contest" />
              <el-option label="娱乐游戏" value="ent" />
              <el-option label="户外活动" value="outdoor" />
              <el-option label="其他" value="other" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" style="font-size: 18px;"/>
          </template>
        </el-input>
        <div class="search-button">
            <el-button :icon="CirclePlus" type="primary" >创建小组</el-button>
            <el-button :icon="Share" type="success" >通过邀请码加入</el-button>
        </div>
    </div>
    <div class="group-list">
        <el-row v-for="i in rowRange" :key="i" :gutter="40" style="height: 250px;margin-top: 10px;margin-bottom: 10px;">
            <el-col v-for="j in 3" :key="j" :span="24 / colNum" class="col">
                <el-card v-show="calcIndex(i, j) < groupInfo.length" class="group-card">
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import {useRouter} from 'vue-router';
import { Search, CirclePlus, Share } from '@element-plus/icons-vue';
import axios from 'axios';

const router = useRouter()

const searchValue = ref('')
const searchType = ref('')
const colNum = ref(3)

const groupInfo = reactive([
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course'},
])

const rowRange = computed(() => {
    return Math.ceil(groupInfo.length / colNum.value)
})

onMounted(() => {
    console.log('row', rowRange.value)
})

function calcIndex(i, j) {
    return (i - 1) * colNum.value + j - 1
}

</script>

<style scoped>
.search {
    width: 100%;
    height: 350px;
    background-image: url('../assets/pic/discovery-search.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.headline {
    font-size: 70px;
    font-weight:700;
    color: white;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    /* text-align: center; */
}

.search-input {
    width: 40%;
    height: 50px;
    border-radius: 25px;
    margin-bottom: 30px;
}

:deep(.el-input__inner) {
    height: 48px;
    font-size: 16px;
}

.search-button {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 20%;
}

.col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.group-list {
    padding-left: 200px;
    padding-right: 200px;
    overflow: auto;
}

.group-card {
    height: 90%;
    width: 100%;
    /* margin-top: 10px; */
}
</style>