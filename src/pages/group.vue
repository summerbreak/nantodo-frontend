<template>
    <div class="container">
        <div class="aside">
            <div class="mine">
                <div class="headline">我的小组</div>
                <el-divider class="divider"></el-divider>
                <div class="aside-list">
                    <div :class="`aside-list-item ${pageIndex === 1 ? 'aside-list-item-active' : ''}`" @click="toJoin">我加入的</div>
                    <div :class="`aside-list-item ${pageIndex === 2 ? 'aside-list-item-active' : ''}`" @click="toManage">我管理的</div>
                </div>
            </div>
            <div class="latest">
                <div class="headline">最近浏览</div>
                <el-divider class="divider"></el-divider>
                <div class="aside-list">
                    <div :class="`aside-list-item `" @click="toGroup('rjjh')">人机交互小组</div>
                    <div :class="`aside-list-item `" @click="toGroup()">DevOps小组</div>
                    <div :class="`aside-list-item `" @click="toGroup()">移动互联网小组</div>
                    <div :class="`aside-list-item `" @click="toGroup()">操作系统小组</div>
                    <div :class="`aside-list-item `" @click="toGroup()">编译原理小组</div>
                </div>
            </div>
        </div>
        <div class="group-main">
            <GroupList v-show="!showDetail" :is-admin="pageIndex === 2" @to-detail="toGroup"></GroupList>
            <GroupDetail v-show="showDetail" :group-id="groupId"></GroupDetail>
        </div>
    </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageIndex = ref(1)
const showDetail = ref(false)
const groupId = ref('')

onBeforeRouteUpdate(to => {
    if ("id" in to.query) {
        groupId.value = to.query.id
        showDetail.value = true
        pageIndex.value = 0
    } else {
        showDetail.value = false
        if (pageIndex.value === 0) {
            pageIndex.value = 1
        }
    }
})

onActivated(() => {
    if ("id" in route.query) {
        groupId.value = route.query.id
        showDetail.value = true
        pageIndex.value = 0
    } else {
        showDetail.value = false
        pageIndex.value = 1
    }
    console.log("activated", showDetail.value)
})

function toJoin() {
    pageIndex.value = 1
    showDetail.value = false
    router.push({ query: {} })
}

function toManage() {
    pageIndex.value = 2
    showDetail.value = false
    router.push({ query: {} })
}

function toGroup(id) {
    pageIndex.value = 0
    showDetail.value = true
    groupId.value = id
    router.push({
        path: "/group",
        query: {
            id
        }
    })
}

</script>

<style scoped>
.container {
    height: 100%;
    width: 1200px;
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
    background-color: #fffffa;
    padding-top: 15px;
    box-shadow: var(--el-box-shadow-light);
}
.latest {
    height: 400px;
    width: calc(100% - 20px);
    border-radius: 3px;
    margin: 10px;
    margin-top: 10px;
    padding-top: 15px;
    background-color: #fffffa;
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
    height: calc(85vh);
    margin-top: 30px;
    /* margin-bottom: 30px; */
    width: 950px;
    border-radius: 3px;
}
</style>