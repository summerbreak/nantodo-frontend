<template>
    <!-- <h2>detail of group {{ props.groupId }}</h2> -->
    <div class="detail-container">
        <div class="group-info">
            <div class="group-desc">
                <div class="title">
                    <el-icon class="click-icon" @click="backToGroup">
                        <ArrowLeft />
                    </el-icon>
                    <el-divider direction="vertical" style="height: 30px;"></el-divider>
                    <span style="font-size: 28px;font-weight: bold;">{{ groupInfo.name }}</span>
                </div>
                <div class="desc-item" style="display: flex; flex-direction: row;">
                    <div style="width: 50%;">组长: {{ leaderName }}</div>
                    <span>邀请码: {{ invitingCode }}
                        <div class="colored-icon" @click="copyCode"><i class="bi bi-copy"></i></div>
                    </span>
                </div>
                <div class="desc-item">所属{{ organNameLabel }}: {{ groupInfo.organName }}
                    <div v-show="groupInfo.type === 'course'" class="colored-icon" @click="toCourse">
                        <i class="bi bi-box-arrow-up-right"></i>
                    </div>
                </div>
                <div class="desc-item">简介: {{ groupInfo.description }}</div>
            </div>
            <div class="group-info-chart">
                <el-progress type="dashboard" :percentage="taskProgress" :color="progressColor">
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
                <el-tab-pane class="tab-pane">
                    <template #label>
                        <i class="bi bi-list-task"></i>
                        <span style="margin-left: 10px;">任务列表</span>
                    </template>
                    <div v-show="isAdmin" style="margin-bottom: 10px;">
                        <el-button type="primary" :icon="CirclePlus" @click="addTask"
                            style="background-color: #ff7f50; border-color: #ff7f50;">添加任务</el-button>
                        <el-popover placement="top" content="将每个未分配任务随机分配给一位成员。使用随机分配需要保证未分配任务数与成员数相同" :hide-after="50">
                            <template #reference>
                                <el-button type="primary" @click="assignTaskRandomly"
                                    style="background-color: #ff7f50; border-color: #ff7f50;">
                                    随机分配&nbsp;<i class="bi bi-question-circle"></i>
                                    <template #icon>
                                        <i class="bi bi-shuffle"></i>
                                    </template>
                                </el-button>
                            </template>
                        </el-popover>
                        <span v-show="showRandomWarning"
                            style="color: red;font-size: 14px;margin-left: 20px;">未分配任务数与成员数不匹配</span>
                        <el-popconfirm title="该操作会清空当前所有任务。确定继续吗？" width="200" @confirm="cleanTask" :hide-after="50">
                            <template #reference>
                                <el-button :disabled="!isAllFinished" type="success"
                                    style="float: right;">开启新一轮任务</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button :disabled="!isAllFinished" type="success" @click="toCourse"
                            style="float: right;margin-right: 10px;">交作业</el-button>
                    </div>
                    <el-table :data="taskInfo" :row-style="rowStyle">
                        <template #empty>
                            <div v-if="isAdmin" style="height: 70px; line-height: 70px;">
                                暂无任务，快来 <a class="click-icon" @click="addTask">添加任务</a> 吧
                            </div>
                            <div v-else style="height: 70px; line-height: 70px;">
                                暂无任务，快来 <a class="click-icon" @click="urgeLeader">催促组长</a> 布置任务吧
                            </div>
                        </template>
                        <el-table-column prop="title" label="任务名" width="120" />
                        <el-table-column label="详情" width="200">
                            <template #default="{ row }">
                                <div class="content">{{ row.content }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="DDL" width="180">
                            <template #default="{ row }">
                                <div>{{ row.deadline.toLocaleString('af') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="完成状态" align="center" width="100">
                            <template #default="{ row }">
                                <span :style="`color: ${taskStatusColor[taskStatus(row)]}`">{{
                                    taskStatusText[taskStatus(row)] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属组员" align="center" width="100">
                            <template #default="{ row }">
                                <span :style="memberName(row.userId) === '未分配' ? 'color: red;' : ''">{{
                                    memberName(row.userId) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template #default="{ row, $index }">
                                <div
                                    style="display: flex; justify-content: space-evenly;padding-left: 20px;padding-right: 20px;">
                                    <el-tooltip placement="top" content="编辑任务">
                                        <el-icon v-show="isAdmin" size="24" class="click-icon" @click="editTask($index)">
                                            <Edit />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip placement="top" :content="row.done ? '取消完成' : '强制完成'">
                                        <el-icon v-show="isAdmin" size="24" class="click-icon" @click="changeStatus(row.id)">
                                            <CircleCheck v-show="!row.done" />
                                            <CircleClose v-show="row.done" />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-popconfirm title="确定要删除吗" @confirm="deleteTask(row.id)" :hide-after="50">
                                        <template #reference>
                                            <div>
                                                <el-tooltip placement="top" content="删除任务">
                                                    <el-icon v-show="isAdmin" size="24" class="click-icon">
                                                        <Delete />
                                                    </el-icon>
                                                </el-tooltip>
                                            </div>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane class="tab-pane">
                    <template #label>
                        <i class="bi bi-people-fill"></i>
                        <span style="margin-left: 10px;">成员列表</span>
                    </template>
                    <el-table :data="memberInfo" :row-style="rowStyle">
                        <el-table-column width="100" align="center">
                            <template #default="{ row }">
                                <el-avatar :src="row.avatarUrl" :size="40" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="100" />
                        <el-table-column prop="studentNumber" label="学号" width="120" />
                        <el-table-column prop="phone" label="手机号" width="120" />
                        <el-table-column prop="email" label="邮箱" width="200" />
                        <el-table-column prop="grade" label="年级" width="80" />
                        <el-table-column v-if="isAdmin" label="操作" align="center">
                            <template #default="{ row }">
                                <el-popconfirm title="确定要删除吗" @confirm="deleteMember(row.id)" :hide-after="50">
                                    <template #reference>
                                        <div v-show="row.id !== groupInfo.leaderId">
                                            <el-tooltip placement="top" content="删除组员">
                                                <el-icon size="24" class="click-icon">
                                                    <Close />
                                                </el-icon>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                        <el-table-column v-else />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane class="tab-pane" label="申请审核" v-if="isAdmin">
                    <template #label>
                        <i class="bi bi-person-fill-add"></i>
                        <span style="margin-left: 10px;">申请审核</span>
                    </template>
                    <el-scrollbar height="500px">
                    <el-empty v-if="applicationList.length === 0"></el-empty>
                    <el-timeline v-else>
                        <el-timeline-item v-for="app in applicationList" :key="app.id"
                            :timestamp="app.timestamp" :type="applicationType(app.status)" class="timeline-item">
                            <div class="message">
                                <span style="font-size: 16px;">{{ app.name }} 申请加入小组</span>
                                <div v-if="app.status === 'pending'" style="display: inline; font-size: 20px;">
                                    <el-icon class="click-icon" color="green" @click="acceptApp(app)"><Check /></el-icon>
                                    <el-icon class="click-icon" style="margin-left: 20px;" @click="refuseApp(app)"><Close /></el-icon>
                                </div>
                                <el-text v-else-if="app.status === 'accepted'" type="info" style="margin-right: 10px;margin-bottom: 9px;">已同意</el-text>
                                <el-text v-else type="info" style="margin-right: 10px;margin-bottom: 9px;">已拒绝</el-text>
                            </div>
                        </el-timeline-item>
                    </el-timeline></el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-model="createTask" :title="editingTaskIndex >= 0 ? '编辑任务':'创建任务'" width="40%"
             :before-close="resetIndex" :close-on-click-modal="false" :close-on-press-escape="false">
            <TaskDetail :users="memberInfo" :task="editingTaskIndex >= 0 ? taskInfo[editingTaskIndex] : null"
                :group-id="groupInfo.id" @close-form="closeForm" @update-task="getTaskInfo"></TaskDetail>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { CirclePlus, ArrowLeft, Edit, Delete, CircleCheck, CircleClose, Check, Close } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import axios from 'axios';
const props = defineProps(['groupId'])
const userStore = useUserStore()
const router = useRouter()

let user = {}
const groupInfo = reactive({
    id: '',
    name: '',
    leaderId: '',
    organName: '',
    type: '',
    description: '',
    courseId: ''
})
const memberInfo = reactive([{
    id: '',
    name: '',
    studentNumber: '',
    phone: '',
    email: '',
    grade: '',
    avatarUrl: ''
}])
const taskInfo = reactive([])
const applicationList = reactive([])

const loading = ref(false)
const showRandomWarning = ref(false)
const taskStatusText = ['未完成', '已完成', '已过期']
const taskStatusColor = ['gray', '#00CD00', 'red']
const createTask = ref(false)
const editingTaskIndex = ref(-1)

watch(() => props.groupId, () => {
    getData()
})

onMounted(() => {
    getData()
})

function getData() {
    user = userStore.getUser()
    loading.value = true
    axios.get(`http://localhost:8080/group?id=${props.groupId}`).then(res => {
        // console.log('group', res.data)
        Object.keys(res.data).forEach(key => {
            groupInfo[key] = res.data[key]
        })
        getMemberInfo()
        getTaskInfo()
        loading.value = false
        applicationList.length = 0
        applicationList.splice(0, 0, ...res.data.applications)
    }).catch(err => {
        console.log(err)
        loading.value = false
    })
}

function getMemberInfo() {
    memberInfo.length = 0
    axios.get(`http://localhost:8080/group/allMember?groupId=${props.groupId}`).then(
        res => {
            res.data.forEach(member => {
                memberInfo.push({...member})
            })
        }, err => {
            console.log('获取成员列表失败', err)
        }
    )
}

function getTaskInfo() {
    taskInfo.length = 0
    axios.get(`http://localhost:8080/task/ofGroup?groupId=${props.groupId}`).then(
        res => {
            res.data.forEach(task => {
                task.deadline = new Date(task.deadline)
                taskInfo.push({...task})
            })
        }, err => {
            console.log('获取任务列表失败', err)
        }
    )
}

const leaderName = computed(() => {
    if (memberInfo.length === 0) {
        return ''
    }
    const leader = memberInfo.find(member => member.id === groupInfo.leaderId)
    if (leader) {
        return leader.name
    }
    return ''
})

const taskProgress = computed(() => {
    if (taskInfo.length === 0) {
        return 0
    }
    const doneTaskNum = taskInfo.filter(task => task.done).length
    return Math.round(doneTaskNum / taskInfo.length * 100)
})

const urgentNum = computed(() => {
    // 计算已过期的任务数以及当前时间与截止时间相差小于3天的任务数
    return taskInfo.filter(task => isUrgent(task)).length
})

const urgentColor = computed(() => {
    return urgentNum.value > 0 ? 'red' : '#666'
})

const isAdmin = computed(() => {
    return groupInfo.leaderId === user.id
})

const isAllFinished = computed(() => {
    return taskInfo.length !== 0 && taskInfo.every(task => task.done)
})

const invitingCode = computed(() => {
    // 截取id后6位作为邀请码（转换为大写）
    return groupInfo.id.slice(-6).toUpperCase()
})

const organNameLabel = computed(() => {
    return groupInfo.type === 'course' ? '课程' : '组织'
})


/*
const groupInfo = reactive({
    id: '6fd3jksdf4vcnc90k3',
    name: "人机交互小组",
    leaderId: '111',
    organName: '人机交互设计',
    type: 'course',
    description: '欢迎大家加入我们小组，QQ群坚持中国特色社会主义道路，坚持马克思列宁主义，坚持人民民主专政',
    courseId: '1141514'
})

const memberInfo = reactive([
    { id: '111', name: '张宏鑫', studentNumber: '211250167', phone: '11111111111', email: '123@321.com', grade: '大四', avatarUrl: 'https://picsum.photos/seed/111/100/100' },
    { id: '222', name: '周豪', studentNumber: '211250167', phone: '11111111111', email: '123@321.com', grade: '大四' , avatarUrl: 'https://picsum.photos/seed/222/100/100' },
    { id: '333', name: '胡书毓', studentNumber: '211250167', phone: '11111111111', email: '123@321.com', grade: '大四' , avatarUrl: 'https://picsum.photos/seed/333/100/100' },
    { id: '444', name: '唐扬', studentNumber: '211250167', phone: '11111111111', email: '123@321.com', grade: '大四' , avatarUrl: 'https://picsum.photos/seed/444/100/100' },
])

const taskInfo = reactive([
    { id: 't1', title: '做画布', content: '绘制discord商业模式画布', done: false, userId: '', deadline: '2023-12-31 23:59:59' },
    { id: 't2', title: '商业模式评估', content: '对discord进行商业模式评估', done: true, userId: '', deadline: '2023-12-31 23:59:59' },
    { id: 't3', title: '任务1', content: '控制ros中小乌龟的移动', done: false, userId: '', deadline: '2023-12-01 23:59:59' },
    { id: 't4', title: '任务任务任务任务任务', content: '对某一小组的项目完成启发式评估，模仿示例完成相应文档', done: false, userId: '', deadline: '2023-12-31 23:59:59' },
])

const applicationList = reactive([
    {timestamp: '2023-09-15 13:01:34', id: '123', name: '匡宏宇', status: 'pending'},
    {timestamp: '2023-09-15 13:01:34', id: '313', name: '小仙女', status: 'pending'},
    {timestamp: '2023-09-15 13:01:34', id: '534', name: '张维为', status: 'refused'},
    {timestamp: '2023-09-15 13:01:34', id: '4ee', name: '刘钦', status: 'accepted'}
])
*/

function progressColor(percentage) {
    if (percentage < 50) {
        return '#909399'
    } else if (percentage < 80) {
        return '#409EFF'
    } else {
        return '#00CD66'
    }
}

function isUrgent(task) {
    if (task.done) {
        return false
    }
    const now = new Date()
    const deadline = new Date(task.deadline)
    return now > deadline || deadline - now < 3 * 24 * 60 * 60 * 1000
}

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

function rowStyle({ row, rowIndex }) {
    let style = { height: '70px' }
    if (isUrgent(row)) {
        style['background-color'] = '#ffe6e6'
    }
    return style
}

function backToGroup() {
    router.push('/group')
}

function copyCode() {
    navigator.clipboard.writeText(invitingCode.value).then(() => {
        ElMessage.success('已复制到剪贴板');
    }, () => {
        ElMessage.error('复制失败');
    })
}

function toCourse() {
    router.push({
        path: '/course',
        query: {
            id: groupInfo.courseId
        }
    })
}

function addTask() {
    createTask.value = true
}

function assignTaskRandomly() {
    const unassignedTask = taskInfo.filter(task => task.userId === '')
    if (unassignedTask.length !== memberInfo.length) {
        showRandomWarning.value = true
        return
    }
    showRandomWarning.value = false
    // 随机分配任务
    const memberIds = memberInfo.map(member => member.id)
    unassignedTask.forEach(task => {
        const randomIndex = Math.floor(Math.random() * memberIds.length)
        task.userId = memberIds[randomIndex]
        memberIds.splice(randomIndex, 1)
        axios.put(`http://localhost:8080/task?id=${task.id}`, task).then(
            () => {}, err => {
                console.log('随机分配更新失败', err)
            }
        )
    })
    ElMessage.success('任务已随机分配')
}

function editTask(index) {
    console.log('edit task', index)
    editingTaskIndex.value = index
    createTask.value = true
}

function resetIndex(done) {
    editingTaskIndex.value = -1
    done()
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
    axios.delete(`http://localhost:8080/task?id=${id}`).then(
        res => {
            ElMessage.success('删除成功')
        }, err => {
            console.log(err)
            ElMessage.error('删除失败')
        }
    )
    taskInfo.forEach((task, index) => {
        if (task.id === id) {
            taskInfo.splice(index, 1)
            return
        }
    })
}

function urgeLeader() {
    let lastUrgeTime = localStorage.getItem('lastUrgeTime-' + groupInfo.id)
    if (lastUrgeTime && Date.now() - lastUrgeTime < 24 * 60 * 60 * 1000) {
        ElMessage.warning('今天已经催促过了，明天再试试吧')
        return
    }
    localStorage.setItem('lastUrgeTime-' + groupInfo.id, Date.now())
    axios.post(`http://localhost:8080/user/message?id=${groupInfo.leaderId}`, {
        content: `小组 ${groupInfo.name} 的成员催促您布置任务`,
        type: 'primary',
        timestamp: Date.now()
    }).then(
        res => {
            ElMessage.success('通知组长成功')
        }, err => {
            console.log(err)
            ElMessage.error('通知组长失败')
        }
    )
}

function sortTask() {

}

function closeForm() {
    createTask.value = false
}

function deleteMember(id) {
    memberInfo.forEach((member, index) => {
        if (member.id === id) {
            memberInfo.splice(index, 1)
            return
        }
    })
}

function applicationType(status) {
    if (status === 'pending') {
        return ''
    } else if (status === 'accepted') {
        return 'success'
    } else {
        return 'danger'
    }
}

function acceptApp(app) {
    app.status = 'accepted'
}

function refuseApp(app) {
    app.status = 'refused'
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

.colored-icon {
    display: inline;

    &:hover {
        cursor: pointer;
        color: orange;
    }
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

.timeline-item {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 90%;
}

.message {
    display: flex;
    justify-content: space-between;
}
</style>

<style>
.detail-tab>.el-tabs__header {
    --el-color-primary: coral;
}
</style>