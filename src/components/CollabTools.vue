<template>
    <div v-for="tool in tools" :key="tool.name">
        <div class="title">{{ tool.name }}</div>
        <el-input :disabled="!props.isAdmin" v-model="tool.url">
            <template #append>
                <el-button v-show="tool.type === 'git'" @click="clone(tool.url)" class="inner-button" style="margin-right: 22px;background-color: var(--el-color-success) !important;">clone</el-button>
                <el-button @click="toUrl(tool.url)" class="inner-button">前往</el-button>
            </template>
        </el-input>
    </div>
    <el-button v-show="props.isAdmin" type="primary" style="margin-top: 10px;">新建</el-button>
</template>

<script setup>
import { ElMessage } from 'element-plus'
const props = defineProps(['tools', 'isAdmin'])

function toUrl(url) {
    window.open(url)
}

function clone(url) {
    let cmd = `git clone ${url}.git`
    // 复制到剪切板
    navigator.clipboard.writeText(cmd).then(() => {
        ElMessage.success('git命令已复制到剪切板')
    }, () => {
        ElMessage.error('git命令复制失败')
    })
}

</script>

<style scoped>
.title {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
}
.inner-button {
    background-color: var(--el-color-primary) !important;
    color: white !important;
}
</style>