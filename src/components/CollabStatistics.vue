<template>
    <div>
        <el-tabs tab-position="top">
            <el-tab-pane v-for="tool in props.tools" :key="tool.name" :label="tool.name">
                <div :id="`chart-${tool.name}`" style="width: 500px;height: 400px;margin: auto;"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount } from 'vue'
const props = defineProps(['tools'])

let charts = []
let pieOption = {
    title: {
        text: '成员文档字数统计',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    series: {
        name: '字数',
        type: 'pie',
        data: [
            { value: 1783, name: '张宏鑫' },
            { value: 1892, name: '周豪' },
            { value: 2315, name: '胡书毓' },
            { value: 1703, name: '唐扬' }
        ]
    
    }
}
let barOption1 = {
    title: {
        text: '成员提交次数统计'
    },
    tooltip: {},
    legend: {
        data: ['提交次数']
    },
    xAxis: {
        data: ["张宏鑫", "周豪", "胡书毓", "唐扬"]
    },
    yAxis: {},
    series: [{
        name: '提交次数',
        type: 'bar',
        data: [21, 12, 22, 26]
    }]
}
let barOption2 = {
    title: {
        text: '成员提交次数统计'
    },
    tooltip: {},
    legend: {
        data: ['提交次数']
    },
    xAxis: {
        data: ["张宏鑫", "周豪", "胡书毓", "唐扬"]
    },
    yAxis: {},
    series: [{
        name: '提交次数',
        type: 'bar',
        data: [23, 2, 0, 5]
    }]
}
let options = [pieOption, barOption1, barOption2]

onMounted(() => {
    let i = 0
    for (let tool of props.tools) {
        let chart = echarts.init(document.getElementById(`chart-${tool.name}`))
        chart.setOption(options[i++])
        charts.push(chart)
    }
})

onBeforeUnmount(() => {
    for (let chart of charts) {
        chart && chart.dispose()
    }
})

</script>