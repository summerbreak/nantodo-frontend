<template>
    <div style="display: flex; flex-direction: column;width:100%;">
        <div class="block" v-if="!edit">
            <el-form label-width="50%" class="settings" label-position="right" hide-required-asterisk size="large">
                <el-form-item label="紧急模式开始时间" prop="emergencyDays" style="font-weight: bold;">
                    <el-text style="width: 25vh; font-size: 18px; font-weight: normal;"> 距离DDL{{ settings.emergencyDays
                    }}天</el-text>
                </el-form-item>
                <el-form-item label="紧急模式提醒频率" prop="noticeFrequency" style="font-weight: bold;">
                    <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">每{{ settings.noticeFrequency
                    }}小时提醒</el-text>
                </el-form-item>
                <el-form-item label="静默模式是否开启" prop="quietMode" style="font-weight: bold;">
                    <el-switch v-model="settings.quietMode" active-color="#db8916" disabled="true"></el-switch>
                </el-form-item>
                <el-form-item label="静默模式开始时间" prop="quietModeStart" style="font-weight: bold;">
                    <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">从{{ settings.quietModeStart
                    }}点</el-text>
                </el-form-item>
                <el-form-item label="静默模式结束时间" prop="quietModeEnd" style="font-weight: bold;">
                    <el-text style="width: 25vh; font-size: 18px;font-weight: normal;">从{{ settings.quietModeEnd
                    }}点</el-text>
                </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: center; padding-bottom: 20px;">
                <el-button type="warning" style="width: 20%; height: 42px; font-size: 18px;"
                    @click="edit = true; setSettings()">编辑</el-button>
            </div>
        </div>
        <div v-else>
            <el-form label-width="50%" class="settings" label-position="right" hide-required-asterisk size="large">
                <el-form-item label="紧急模式开始时间" prop="emergencyDays" style="font-weight: bold;">
                    <span class="font">距离DDL</span>
                    <el-input-number v-model="settings.emergencyDays"
                        style="width: 15vh; font-size: 18px; font-weight: normal;"></el-input-number>
                    <span class="font">天</span>
                </el-form-item>
                <el-form-item label="紧急模式提醒频率" prop="noticeFrequency" style="font-weight: bold;">
                    <span class="font">每</span>
                    <el-input-number v-model="settings.noticeFrequency"
                        style="width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                    <span class="font">小时提醒</span>
                </el-form-item>
                <el-form-item label="静默模式是否开启" prop="quietMode" style="font-weight: bold;">
                    <el-switch v-model="settings.quietMode" active-color="#db8916"></el-switch>
                </el-form-item>
                <el-form-item label="静默模式开始时间" prop="quietModeStart" style="font-weight: bold;">
                    <span class="font">从</span>

                    <el-input-number v-model="settings.quietModeStart"
                        style="width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                    <span class="font">点</span>

                </el-form-item>
                <el-form-item label="静默模式结束时间" prop="quietModeEnd" style="font-weight: bold;">
                    <span class="font">到</span>

                    <el-input-number v-model="settings.quietModeEnd"
                        style="width: 15vh; font-size: 18px;font-weight: normal;"></el-input-number>
                    <span class="font">点</span>

                </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: center; padding-bottom: 20px;">
                <el-button style="height: 42px;font-size: 18px;" @click="edit = false;">取消</el-button>
                <el-button type="warning" style="height: 42px;font-size: 18px;"
                    @click="submitForm(ruleFormRef)">提交</el-button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.font {
    font-size: 18px;
    font-weight: normal;
    color: #606266;
}
</style>

<script setup>

import { reactive, ref, watch } from "vue"
import { useUserStore } from '../stores/user.js'
import axios from 'axios'

const ruleFormRef = ref()
const userStore = useUserStore()
const user = userStore.getUser()
const swichDisable = ref(true)
const edit = ref(false)
const settings = reactive({
    emergencyDays: '',
    noticeFrequency: '',
    quietMode: '',
    quietModeStart: '',
    quietModeEnd: '',
})

const setSettings = async () => {
    console.log(user)
    settings.emergencyDays = user.settings.emergencyDays
    settings.noticeFrequency = user.settings.noticeFrequency
    settings.quietMode = user.settings.quietMode
    settings.quietModeStart = user.settings.quietModeStart
    settings.quietModeEnd = user.settings.quietModeEnd
}

watch(userStore.getUser, () => {
    setSettings()
})

setSettings()
</script >
