<template>
    <el-empty v-if="groupList.length == 0" description=" " :image-size="100" class="empty">
        <div>还没有小组哦，去 <router-link to="/course">课程</router-link> 或 <router-link to="/discovery">发现</router-link> 看看吧</div>
    </el-empty>
    <el-table v-else :data="currentGroupList" class="table" id="groupTable" :cell-style="cellStyle" :show-header="false"
        :row-key="(row) => row.id">
        <el-table-column width="80">
            <template v-slot="scope" #default>
                <i :class="`bi bi-${iconMap[scope.row.type]}`"></i>
            </template>
        </el-table-column>
        <el-table-column prop="name" width="200" />
        <el-table-column prop="organName" width="250" />
        <el-table-column prop="other" width="200" />
        <el-table-column>
            <template v-slot="scope" #default>
                <el-tooltip content="查看详情" placement="top">
                    <i class="bi bi-card-list check-detail" @click="emit('toDetail', scope.row.id)"></i>
                </el-tooltip>
                <el-tooltip content="按住以拖拽" placement="top">
                    <i class="bi bi-arrow-down-up handle-drag"></i>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import Sortable from 'sortablejs';

const userStore = useUserStore()
const props = defineProps(['isAdmin'])
const emit = defineEmits(['toDetail'])

const user = userStore.getUser()
const groupList = reactive([
    {id: 'rjjh', name: '人机交互小组', organName: '人机交互系统', leader: '123', type: 'course', other: '1 项待办'},
    {id: 'ydhl', name: '移动互联网小组', organName: '移动互联网软件工程', leader: '123', type: 'course', other: '1 项待办'},
    {id: 'kjkt', name: '锟斤拷烫烫烫小队', organName: '2023EL程序设计竞赛', leader: '123', type: 'contest', other: '1 项待办' },
    {id: 'devo', name: 'DevOps小组', organName: 'DevOps开发', leader: '456', type: 'course', other: '有新任务'},
    {id: 'czxt', name: '操作系统小组', organName: '操作系统', leader: '456', type: 'course', other: '1 项待办'},
    {id: 'qxss', name: '栖霞山赏枫', organName: '自由组队', leader: '456', type: 'outdoor', other: '1 项待办' },
    {id: 'lrss', name: '狼人杀时间', organName: '桌游社', leader: '456', type: 'ent', other: '1 项待办' },
    {id: 'bowh', name: '北欧文化研讨会', organName: '自由组队', leader: '456', type: 'other', other: '1 项待办' },
])
const joinedGroupList = reactive([])
const adminGroupList = reactive([])
const iconMap = {course: 'book course-color', contest: 'trophy contest-color', ent: 'controller ent-color',
                 outdoor: 'flag outdoor-color', other: 'lightbulb other-color'}


const currentGroupList = computed(() => {
    return props.isAdmin ? adminGroupList : joinedGroupList
})

onMounted(() => {
    setSort()
    groupList.forEach(group => {
        group.leader === user.id ? adminGroupList.push(group) : joinedGroupList.push(group)
    })
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
    /* font-family: 'Microsoft YaHei', sans-serif; */
}

.check-detail:hover {
    cursor: pointer;
}
.handle-drag {
    margin-left: 20px;
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

