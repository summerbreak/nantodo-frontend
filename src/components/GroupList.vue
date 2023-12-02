<template>
    <el-empty v-if="groupList.length == 0" description=" " :image-size="100" class="empty">
        <div>还没有小组哦，去 <router-link to="/course">课程</router-link> 或 <router-link to="/discovery">发现</router-link> 看看吧</div>
    </el-empty>
    <el-table v-else :data="groupList" class="table" :cell-style="cellStyle" :show-header="false">
        <el-table-column width="80">
            <template #default>
                <i class="bi bi-heart"></i>
            </template>
        </el-table-column>
        <el-table-column prop="name" width="200" />
        <el-table-column prop="organName" width="400" />
        <el-table-column>
            <template v-slot="scope" #default>
                <i @click="playSong(scope.row)" 
                    :class="`bi bi-${scope.row.isPlaying ? 'pause' : 'play'}-circle song-opt`"></i>
                <i class="bi bi-arrow-down-up song-opt handle-drag"></i>
                <i @click="deleteSong(scope.row)" class="bi bi-trash song-opt"></i>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const groupList = reactive([
    {name: '人机交互小组', organName: '人机交互系统'},
    {name: 'DevOps小组', organName: 'DevOps开发'},
    {name: '移动互联网小组', organName: '移动互联网软件工程'},
    {name: '操作系统小组', organName: '操作系统'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
    {name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛'},
])

function cellStyle({row, column, rowIndex, columnIndex}) {
    let style = {
        height: '100px',
        'font-size': '20px',
        'color': 'black',
    }
    if (columnIndex == 0) {
        style['padding-left'] = '20px'
    }
    if (columnIndex == 2) {
        style['color'] = '#aaa'
    }
    return style
}

</script>

<style scoped>
.empty {
    height: 80%;
    background-color: white;
}

.table {
    height: 100%;
    width: 100%;
}

</style>

