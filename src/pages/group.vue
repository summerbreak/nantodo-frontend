<template>
    <div class="container">
        <div class="aside">
            <div class="mine">
                <div class="headline">我的小组</div>
                <el-divider class="divider"></el-divider>
                <div class="aside-list">
                    <div :class="`aside-list-item ${isJoinPage ? 'aside-list-item-active' : ''}`" @click="toJoin">我加入的</div>
                    <div :class="`aside-list-item ${!isJoinPage ? 'aside-list-item-active' : ''}`" @click="toManage">我管理的</div>
                </div>
            </div>
            <div class="latest">
                <div class="headline">最近浏览</div>
                <el-divider class="divider"></el-divider>
                <div class="aside-list">
                    <div :class="`aside-list-item `" @click="toJoin">人机交互小组</div>
                    <div :class="`aside-list-item `" @click="toJoin">DevOps小组</div>
                    <div :class="`aside-list-item `" @click="toJoin">移动互联网小组</div>
                    <div :class="`aside-list-item `" @click="toJoin">操作系统小组</div>
                    <div :class="`aside-list-item `" @click="toJoin">编译原理小组</div>
                </div>
            </div>
        </div>
        <div class="group-main">
            <!-- <keep-alive>
                <component :is="compList[compListIndex]"></component>
            </keep-alive> -->
            <GroupList></GroupList>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import GroupList from '../components/GroupList.vue'

const isJoinPage = ref(true)
const compList = [GroupList]
const compListIndex = ref(0)

function toJoin() {
    isJoinPage.value = true
}

function toManage() {
    isJoinPage.value = false
}

</script>

<style scoped>
.container {
    height: 100%;
    width: 1100px;
    /* background-color: #555; */
    margin: auto;
    display: flex;
    flex-direction: row;
}
.aside {
    /* background-color: #aaa; */
    height: 100%;
    width: 250px;
}

.aside-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: calc(100% - 50px);
}

.aside-list-item {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    &:hover {
        cursor: pointer;
        background-color: peachpuff;
        border-radius: 8px;
    }
}

.aside-list-item-active {
    color: orange;
}

.mine {
    height: 200px;
    width: calc(100% - 20px);
    border-radius: 3px;
    margin: 10px;
    margin-top: 30px;
    background-color: white;
    padding-top: 15px;
    box-shadow: var(--el-box-shadow-light);
}
.latest {
    height: 400px;
    width: calc(100% - 20px);
    border-radius: 3px;
    margin: 10px;
    margin-top: 50px;
    padding-top: 15px;
    background-color: white;
    box-shadow: var(--el-box-shadow-light);
}

.headline {
    font-family: 'Microsoft YaHei', sans-serif;
    font-weight: bold;
    font-size: 20px;
    margin-left: 20px;
}

.divider {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 20px;
    width: calc(100% - 40px);
}

.group-main {
    /* background-color: #bbb; */
    height: calc(100% - 60px);
    margin-top: 30px;
    margin-bottom: 30px;
    width: 850px;
    border-radius: 3px;
}
</style>