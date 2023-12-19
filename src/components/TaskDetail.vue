<template>
    <el-form :model="task" label-width="auto" :rules="rules" ref="formRef">
        <el-form-item label="任务名" prop="title">
            <el-input v-model="task.title" placeholder="不超过10个字" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="content">
            <el-input type="textarea" v-model="task.content" placeholder="不超过150个字" :maxlength="150"
                resize="none" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline">
            <el-date-picker v-model="task.deadline" type="datetime" :disabled-date="onlyFuture" :editable="false"
                popper-class="task-date-picker"/>
        </el-form-item>
        <el-form-item label="指派给" prop="user">
            <el-select v-model="task.userId" placeholder="可稍后再选择">
                <el-option v-for="user in props.users" :key="user.id" :label="user.name" :value="user.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="closeForm">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios';

const props = defineProps(['users', 'task'])
const emit = defineEmits(['closeForm'])


const formRef = ref()
const editing = ref(false)
const task = reactive({
    title: '',
    content: '',
    deadline: '',
    userId: '',
    done: false,
    starred: false,
    releaseTime: ''
})

const rules = {
    title: [
        { required: true, message: '请输入任务名', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入任务描述', trigger: 'blur' }
    ],
    deadline: [
        { type:'date', required: true, message: '请选择截止时间', trigger: 'blur' }
    ]
}


onMounted(() => {
    if (props.task) {
        task.title = props.task.title
        task.content = props.task.content
        task.deadline = props.task.deadline
        task.userId = props.task.userId
        editing.value = true
    }
})

watch(() => props.task, (newVal) => {
    if (newVal) {
        task.title = newVal.title
        task.content = newVal.content
        task.deadline = newVal.deadline
        task.userId = newVal.userId
        editing.value = true
    } else {
        task.title = ''
        task.content = ''
        task.deadline = ''
        task.userId = ''
        editing.value = false
    }
})

function onlyFuture(time) {
    return time.getTime() < Date.now()
}

async function submitForm() {
    console.log('editing', editing.value)
    await formRef.value.validate((valid) => {
        if (valid) {
            if (editing.value) {
                task.releaseTime = new Date()
                axios.post('http://localhost:8080/task', task)
                    .then(res => {
                        console.log(res)
                    }, err => {
                        console.log(err)
                    })
            }
        }
    })
}

function closeForm() {
    emit('closeForm')
    let deadline = task.deadline
    formRef.value.resetFields()
    task.deadline = deadline
    task.userId = ''
}

</script>

<style>
.el-picker-panel__footer .el-button:first-child {
    display: none;
}
</style>

<style scoped></style>