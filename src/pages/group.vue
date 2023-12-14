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
                <div class="recent-list">
                    <div v-for="group in recentGroupList" :key="group.id"
                     class="recent-list-item" @click="toGroup(group.id, group.name)">{{ group.name }}</div>
                </div>
            </div>
        </div>
        <div class="group-main">
            <GroupList v-if="!showDetail" :is-admin="pageIndex === 2" @to-detail="toGroup"></GroupList>
            <GroupDetail v-else :group-id="groupId"></GroupDetail>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onActivated, onDeactivated, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageIndex = ref(1)
let lastPageIndex = 1
const showDetail = ref(false)
const groupId = ref('')
const recentGroupList = reactive([])

onBeforeRouteUpdate(to => {
    console.log('before route update', to.query)
    if ("id" in to.query) {
        groupId.value = to.query.id
        showDetail.value = true
        pageIndex.value = 0
    } else {
        showDetail.value = false
        if (lastPageIndex !== 0) {
            pageIndex.value = lastPageIndex
        }
    }
})

onBeforeRouteLeave(() => {
    pageIndex.value = 2
    lastPageIndex = 2
    // localStorage.removeItem('groupList')
})

onMounted(() => {
    let recentGroupListStr = localStorage.getItem('recentGroupList')
    if (recentGroupListStr) {
        recentGroupList.push(...JSON.parse(recentGroupListStr))
    }
})

onActivated(() => {
    if ("id" in route.query) {
        groupId.value = route.query.id
        showDetail.value = true
        pageIndex.value = 0
    } else {
        showDetail.value = false
        if (lastPageIndex !== 0) {
            pageIndex.value = lastPageIndex
        }
    }
})

onDeactivated(() => {
    console.log("deactivated group")
    localStorage.removeItem('groupList')
})

watch(pageIndex, (newValue, oldValue) => {
    lastPageIndex = oldValue
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

function toGroup(id, name) {
    updateRecentGroupList({id, name})
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

function updateRecentGroupList({id, name}) {
    let index = recentGroupList.findIndex(group => group.id === id)
    if (index !== -1) {
        return
    }
    if (recentGroupList.length >= 6) {
        recentGroupList.pop()
    }
    recentGroupList.unshift({id, name})
    localStorage.setItem('recentGroupList', JSON.stringify(recentGroupList))
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

.recent-list {
    display: flex;
    flex-direction: column;
    align-items: center;
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
.recent-list-item {
    width: calc(100% - 20px);
    margin: 10px 5px 10px 5px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
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
    height: 500px;
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