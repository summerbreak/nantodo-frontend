<template>
    <!-- <h2>detail of group {{ props.groupId }}</h2> -->
    <div class="container">
        <div class="group-desc">
            <h2>{{ groupInfo.name }}</h2>
            <div>组长: {{ memberInfo[0].name }}</div>
            <div>所属{{ organNameLabel }}: {{ groupInfo.organName }}</div>
            <div>简介: {{ groupInfo.description }}</div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const props = defineProps(['groupId'])

const groupInfo = reactive({
    name: "人机交互小组",
    leaderId: '111',
    organName: '人机交互设计',
    type: 'course',
    description: '欢迎大家加入我们小组，QQ群1145141919810'
})

const memberInfo = reactive([
    {id: '111', name: '张宏鑫', studentNumber: '211250167', phone: '11111111111', task: {id: 't1', name: '任务1'}},
    {id: '222', name: '周豪', studentNumber: '211250167', phone: '11111111111', task: {id: 't2', name: '任务2'}},
    {id: '333', name: '胡书毓', studentNumber: '211250167', phone: '11111111111', task: {id: 't3', name: '任务3'}},
    {id: '444', name: '唐扬', studentNumber: '211250167', phone: '11111111111', task: {id: 't4', name: '任务4'}},
])

const taskInfo = reactive([
    {id: 't1', name: '任务1', done: false, userId: '111'},
    {id: 't2', name: '任务2', done: false, userId: '222'},
    {id: 't3', name: '任务3', done: false, userId: '333'},
    {id: 't4', name: '任务4', done: false, userId: '444'},
])

const organNameLabel = computed(() => {
    return groupInfo.type === 'course' ? '课程' : '组织'
})

</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 3px;
}

.group-desc {
    
}
</style>