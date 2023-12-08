<template>
    <!-- <h2>detail of group {{ props.groupId }}</h2> -->
    <div class="detail-container" ref="detailContainer">
        <div class="group-info">
            <div class="group-desc">
                <div class="title">
                    <el-icon class="click-icon" @click="backToGroup"><ArrowLeft /></el-icon>
                    <el-divider direction="vertical" style="height: 30px;"></el-divider>
                    <span style="font-size: 28px;font-weight: bold;">{{ groupInfo.name }}</span>
                </div>
                <div class="desc-item">组长: {{ memberInfo[0].name }}</div>
                <div class="desc-item">所属{{ organNameLabel }}: {{ groupInfo.organName }}</div>
                <div class="desc-item">简介: {{ groupInfo.description }}</div>
            </div>
            <div class="group-info-chart">
                <el-progress type="dashboard" :percentage="taskProgress">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">已完成</span>
                    </template>
                </el-progress>
                <div style="margin-left: 50px;">
                    <div>
                        <span :style="`font-size: 36px;color: ${urgentColor}`">{{ urgentNum }}</span>
                        <span> 项 </span>
                    </div>
                    <div style="font-size: 12px;color: #606266;">紧急任务</div>
                </div>
            </div>
        </div>
        <div style="height: 75%;" ref="detailPart">
            <el-tabs type="border-card" class="detail-tab">
                <el-tab-pane>
                    <template #label>
                        <i class="bi bi-list-task"></i>
                        <span style="margin-left: 10px;">任务列表</span>
                    </template>
                    <div style="margin-bottom: 10px;">
                        <el-button type="primary" :icon="CirclePlus" @click="addTask">添加任务</el-button>
                        <el-button type="primary" :icon="Management" @click="assignTask">分配任务</el-button>
                        <el-radio-group v-model="assignType" style="margin-left: 20px;">
                            <el-radio :label="0">手动分配</el-radio>
                            <el-radio :label="1">随机分配</el-radio>
                        </el-radio-group>
                        <el-popover placement="top" content="将每个未分配任务随机分配给一位成员。使用随机分配需要保证未分配任务数与成员数相同" :hide-after="50">
                            <template #reference>
                                <div class="info-icon">
                                    <i class="bi bi-info-circle"></i>
                                </div>
                            </template>
                        </el-popover>
                        <span v-show="showRandomWarning" style="color: red;font-size: 14px;margin-left: 20px;">未分配任务数与成员数不匹配</span>
                        <el-popconfirm title="该操作会清空当前所有任务。确定继续吗？" width="200" @confirm="cleanTask" :hide-after="50"
                            confirm-button-text="确定" cancel-button-text="取消">
                            <template #reference>
                                <el-button :disabled="!isAllFinished" type="success" style="float: right;">开启新一轮任务</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                    <el-table :data="taskInfo" :row-style="rowStyle">
                        <template #empty>
                            <div v-if="!isAdmin" style="height: 70px; line-height: 70px;">
                                暂无任务，快来 <a class="click-icon" @click="addTask">添加任务</a> 吧
                            </div>
                            <div v-else style="height: 70px; line-height: 70px;">
                                暂无任务，快来 <a class="click-icon" @click="urgeLeader">催促组长</a> 布置任务吧
                            </div>
                        </template>
                        <el-table-column prop="title" label="任务名" width="120" />
                        <el-table-column label="详情" width="200">
                            <template #default="{row}">
                                <div class="content">{{ row.content }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="deadline" label="DDL" width="180" />
                        <el-table-column label="完成状态" align="center" width="100">
                            <template #default="{row}">
                                <span :style="`color: ${taskStatusColor[taskStatus(row)]}`">{{ taskStatusText[taskStatus(row)] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属组员" align="center" width="100">
                            <template #default="{row}">
                                <span :style="memberName(row.id) === '未分配' ? 'color: red;' : ''">{{ memberName(row.id) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template #default="{row}">
                                <div style="display: flex; justify-content: space-evenly;padding-left: 20px;padding-right: 20px;">
                                    <el-tooltip placement="top" content="编辑任务" @click="editTask(row.id)">
                                        <el-icon v-show="isAdmin" size="24" class="click-icon"><Edit /></el-icon>
                                    </el-tooltip>
                                    <el-tooltip placement="top" :content="row.done ? '取消完成' : '强制完成'">
                                        <el-icon v-show="isAdmin" size="24" class="click-icon" @click="changeStatus(row.id)">
                                            <CircleCheck v-show="!row.done" />
                                            <CircleClose v-show="row.done" />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip placement="top" content="删除任务">
                                        <el-icon v-show="isAdmin" size="24" class="click-icon" @click="deleteTask(row.id)"><Delete /></el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <i class="bi bi-people-fill"></i>
                        <span style="margin-left: 10px;">成员列表</span>
                    </template>
                    <el-table :data="memberInfo" :row-style="rowStyle">
                        <el-table-column prop="name" label="姓名" width="180" />
                        <el-table-column prop="studentNumber" label="学号" width="180" />
                        <el-table-column prop="phone" label="联系方式" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="申请审核" v-show="isAdmin">
                    <template #label>
                        <i class="bi bi-person-fill-add"></i>
                        <span style="margin-left: 10px;">申请审核</span>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { CirclePlus, Management, ArrowLeft, Edit, Delete, CircleCheck, CircleClose } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus'
const props = defineProps(['groupId'])
const userStore = useUserStore()
const router = useRouter()

const detailContainer = ref()
const assignType = ref(0)
const assignStatus = ref(false)
const showRandomWarning = ref(false)
const taskStatusText = ['未完成', '已完成', '已过期']
const taskStatusColor = ['gray', '#00CD00', 'red']

onMounted(() => {
})

const taskProgress = computed(() => {
    if (taskInfo.length === 0) {
        return 0
    }
    const doneTaskNum = taskInfo.filter(task => task.done).length
    return Math.round(doneTaskNum / taskInfo.length * 100)
})

const urgentNum = computed(() => {
    return taskInfo.filter(task => !task.done).length
})

const urgentColor = computed(() => {
    return urgentNum.value > 0 ? 'red' : '#666'
})

const isAdmin = computed(() => {
    return groupInfo.leaderId === user.id
})

const isAllFinished = computed(() => {
    return taskInfo.every(task => task.done)
})

const user = reactive({
    id: '111',
    name: '张宏鑫',
    studentNumber: '211250167',
    phone: '11111111111',
    task: {id: 't1', name: '任务1'}
})

const groupInfo = reactive({
    name: "人机交互小组",
    leaderId: '111',
    organName: '人机交互设计',
    type: 'course',
    description: '欢迎大家加入我们小组，QQ群坚持中国特色社会主义道路，坚持马克思列宁主义，坚持人民民主专政'
})

const memberInfo = reactive([
    {id: '111', name: '张宏鑫', studentNumber: '211250167', phone: '11111111111', task: {id: 't1', name: '任务1'}},
    {id: '222', name: '周豪', studentNumber: '211250167', phone: '11111111111', task: {id: 't2', name: '任务2'}},
    {id: '333', name: '胡书毓', studentNumber: '211250167', phone: '11111111111', task: {id: 't3', name: '任务3'}},
    {id: '444', name: '唐扬', studentNumber: '211250167', phone: '11111111111', task: {id: 't4', name: '任务4'}},
])

const taskInfo = reactive([
    {id: 't1', title: '做画布', content: '绘制discord商业模式画布', done: false, userId: '111', deadline: '2023-12-31 23:59:59'},
    {id: 't2', title: '商业模式评估', content: '对discord进行商业模式评估', done: true, userId: '222', deadline: '2023-12-31 23:59:59' },
    {id: 't3', title: '任务1', content: '控制ros中小乌龟的移动', done: false, userId: '333', deadline: '2023-12-01 23:59:59' },
    {id: 't4', title: '任务任务任务任务任务', content: '对某一小组的项目完成启发式评估，模仿示例完成相应文档', done: false, userId: '', deadline: '2023-12-31 23:59:59' },
])

const organNameLabel = computed(() => {
    return groupInfo.type === 'course' ? '课程' : '组织'
})

function taskStatus(task) {
    if (task.done) {
        return 1
    }
    const now = new Date()
    const deadline = new Date(task.deadline)
    if (now > deadline) {
        return 2
    }
    return 0
}

function memberName(id) {
    const member = memberInfo.find(member => member.id === id)
    if (member) {
        return member.name
    }
    return '未分配'
}

function rowStyle({row, rowIndex}) {
    return {height: '70px'}
}

function backToGroup() {
    router.push('/group')
}

function addTask() {
    console.log('add task')
}

function assignTask() {
    let unassignedTasks = taskInfo.filter(task => task.userId === '')
    if (assignType.value === 0) {
        // 手动分配
        if (unassignedTasks.length === 0) {
            ElNotification({
                title: '提示',
                message: '当前没有未分配任务',
                type: 'warning'
            })
            return
        }
        assignStatus.value = true
    } else {
        if (unassignedTasks.length !== memberInfo.length) {
            showRandomWarning.value = true
            return
        }
        assignStatus.value = true
        // 随机分配
        let randomTasks = unassignedTasks.sort(() => Math.random() - 0.5)
        for (let i = 0; i < randomTasks.length; i++) {
            randomTasks[i].userId = memberInfo[i].id
            memberInfo[i].task = {id: randomTasks[i].id, title: randomTasks[i].title}
        }
    }

}

function editTask(id) {
    console.log('edit task', id)
}

function changeStatus(id) {
    taskInfo.forEach(task => {
        if (task.id === id) {
            task.done = !task.done
        }
    })
}

function cleanTask() {
    taskInfo.length = 0
}

function deleteTask(id) {
    taskInfo.forEach((task, index) => {
        if (task.id === id) {
            taskInfo.splice(index, 1)
            return
        }
    })
}

function urgeLeader() {
    let lastUrgeTime = localStorage.getItem('lastUrgeTime')
}

</script>

<style scoped>
.detail-container {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 3px;
}

.group-info {
    height: 25%;
    width: 100%;
    background-color: #fffffa;
    display: flex;
    flex-direction: row;
    box-shadow: var(--el-box-shadow-light);
}

.group-desc {
    width: calc(60% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    padding-left: 20px;
}

.title {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.desc-item {
    margin-bottom: 5px;
    margin-left: 5px;
    color: gray;
}

.group-info-chart {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.detail-tab {
    height: 100%;
}

.click-icon:hover {
    cursor: pointer;
}
.info-icon {
    display: inline;
    margin-left: 10px;
    color: #aaa;
    /* font-size: 14px; */
    &:hover {
        cursor: pointer;
    }
}

.content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

</style>