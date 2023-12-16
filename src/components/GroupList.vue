<template>
    <el-empty v-loading="loading" v-if="currentGroupList.length == 0" description=" " :image-size="100" class="empty">
        <div>还没有小组哦，去 <router-link to="/course">课程</router-link> 或 <router-link to="/discovery">发现</router-link> 看看吧</div>
    </el-empty>
    <el-table v-loading="loading" v-else :data="currentGroupList" class="table" id="groupTable" :cell-style="cellStyle" :show-header="false"
        row-key="id" :row-style="{'background-color': '#fffffa'}">
        <el-table-column width="80">
            <template #default="{row}">
                <i :class="`bi bi-${iconMap[row.type]}`"></i>
            </template>
        </el-table-column>
        <el-table-column prop="name" width="250" />
        <el-table-column prop="organName" width="250" />
        <el-table-column prop="other" width="100" />
        <el-table-column align="center">
            <template #default="{row}">
                <el-tooltip content="查看详情" placement="top">
                    <i class="bi bi-card-list check-detail" @click="emit('toDetail', row.id, row.name)"></i>
                </el-tooltip>
                <el-popconfirm :title="`确定要${deleteLabel}吗？`" @confirm="deleteGroup(row.id)" :hide-after="50">
                    <template #reference>
                        <div style="display: inline;">
                            <el-tooltip :content="deleteLabel" placement="top">
                                <i :class="`bi bi-${isAdmin?'x-lg':'box-arrow-right'} check-detail`"></i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-popconfirm>
                <el-tooltip content="按住以拖拽" placement="top">
                    <i class="bi bi-arrow-down-up handle-drag"></i>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus';
import Sortable from 'sortablejs';
import axios from 'axios';

const userStore = useUserStore()
const props = defineProps(['isAdmin'])
const emit = defineEmits(['toDetail'])

const loading = ref(false)
let user = userStore.getUser()
/*
const groupList = [
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '111', type: 'course', other: '1 项待办'},
    {id: 'ydhl', name: '移动互联网小组', organName: '移动互联网软件工程', leader: '111', type: 'course', other: '1 项待办'},
    {id: 'kjkt', name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛', leader: '111', type: 'contest', other: '1 项待办' },
    {id: 'devo', name: 'DevOps小组', organName: 'DevOps开发', leader: '456', type: 'course', other: '有新任务'},
    {id: 'czxt', name: '操作系统小组', organName: '操作系统', leader: '456', type: 'course', other: '1 项待办'},
    {id: 'qxss', name: '栖霞山赏枫', organName: '自由组队', leader: '456', type: 'outdoor', other: '1 项待办' },
    {id: 'lrss', name: '狼人杀时间', organName: '桌游社', leader: '456', type: 'ent', other: '1 项待办' },
    {id: 'bowh', name: '北欧文化研讨会', organName: '自由组队', leader: '456', type: 'other', other: '1 项待办' },
]
*/
const joinedGroupList = reactive([])
const adminGroupList = reactive([])
const iconMap = {course: 'book course-color', contest: 'trophy contest-color', ent: 'controller ent-color',
                 outdoor: 'flag outdoor-color', other: 'lightbulb other-color'}
let isListChanged = false


const currentGroupList = computed(() => {
    return props.isAdmin ? adminGroupList : joinedGroupList
})

const deleteLabel = computed(() => {
    return props.isAdmin ? '解散小组' : '退出小组'
})

onMounted(() => {
    user = userStore.getUser()
    // 如果本地缓存有小组列表，直接从缓存中读取
    // if (localStorage.getItem('groupList')) {
    //     const localGroupList = JSON.parse(localStorage.getItem('groupList'))
    //     localGroupList.forEach(group => {
    //         group.leaderId === user.id ? adminGroupList.push(group) : joinedGroupList.push(group)
    //     })
    //     nextTick(setSort)
    //     return
    // }
    loading.value = true
    axios.get(`http://localhost:8080/group/all?userId=${userStore.getUser().id}`).then(
        res => {
            // console.log(res.data)
            res.data.forEach(group => {
                group['other'] = TodoNum(group.tasks) + ' 项待办'
                group.leaderId === user.id ? adminGroupList.push(group) : joinedGroupList.push(group)
            })
            localStorage.setItem('groupList', JSON.stringify(res.data))
            loading.value = false
            nextTick(setSort)
        }, err => {
            // console.log(err)
            ElMessage.error('获取小组列表失败, 请重新登录')
            loading.value = false
        }
    )
})

function TodoNum(tasks) {
    console.log('todonum', user.tasks, tasks)
    let num = 0
    // tasks中每有一个taskId在user的tasks中, num++
    tasks.forEach(task => {
        if (user.tasks.includes(task)) {
            num++
        }
    })
    return num
}

onBeforeUnmount(() => {
    if (isListChanged) {
        let groupList = [...joinedGroupList, ...adminGroupList]
        localStorage.setItem('groupList', JSON.stringify(groupList))
        let groupIdList = groupList.map(group => group.id)
        user.groups = groupIdList
        userStore.setUser(user)
        userStore.updateUser(user)
    }
})

function setSort() {
    const el = document.querySelector('#groupTable table tbody')
    new Sortable(el, {
        sort: true,
        handle: '.handle-drag',
        ghostClass: 'sortable-ghost',
        onEnd: (e) => {
            const targetRow = currentGroupList.value.splice(e.oldIndex, 1)[0]
            currentGroupList.value.splice(e.newIndex, 0, targetRow)
            isListChanged = true
        }
    })
}

function cellStyle({row, column, rowIndex, columnIndex}) {
    let style = {
        height: '100px',
        'font-size': '18px',
        'color': 'black',
    }
    if (columnIndex == 0) {
        style['padding-left'] = '20px'
    }
    if (columnIndex == 2) {
        style['color'] = '#aaa'
    }
    if (columnIndex == 3) {
        style['color'] = currentGroupList.value[rowIndex].other.includes('待办') ? '#aaa' : 'red'
    }
    return style
}

function deleteGroup(id) {
    if (props.isAdmin) {
        axios.delete(`http://localhost:8080/group?id=${id}`).then(
            res => {
                ElMessage.success('解散小组成功')
                adminGroupList.splice(0, 1)
                isListChanged = true
            }, err => {
                console.log(err)
                ElMessage.error('解散小组失败')
            }
        )
    } else {
        axios.delete(`http://localhost:8080/group/member?groupId=${id}&userId=${user.id}`).then(
            res => {
                ElMessage.success('退出小组成功')
                joinedGroupList.splice(0, 1)
                isListChanged = true
            }, err => {
                console.log(err)
                ElMessage.error('退出小组失败')
            }
        )
    }
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
    box-shadow: var(--el-box-shadow-light);
    background-color: #fffffa;
}

.check-detail {
    margin-right: 15px;
}

.check-detail:hover {
    cursor: pointer;
}
.handle-drag {
    &:hover {
        cursor: pointer;
    }
}

.course-color {
    color: #548B54;
}

.contest-color {
    color: goldenrod;
}

.ent-color {
    color: blue;
}

.outdoor-color {
    color: red;
}

.other-color {
    color: 	#EEEE00;
}

</style>

