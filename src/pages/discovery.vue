<template>
    <div class="search">
        <div class="headline">寻找志同道合的伙伴</div>
        <el-input clearable
          v-model="searchValue"
          placeholder="搜你感兴趣的小组"
          class="search-input"
          @keyup.enter.native="searchGroup"
        >
          <template #prepend>
            <el-select v-model="searchType" placeholder="筛选类别" style="width: 115px; height: 50px;">
                <el-option label="全部" value="all" />
                <el-option label="比赛竞技" value="contest" />
                <el-option label="娱乐游戏" value="ent" />
                <el-option label="户外活动" value="outdoor" />
                <el-option label="其他" value="other" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" style="font-size: 18px;" @click="searchGroup"/>
          </template>
        </el-input>
        <div class="search-button">
            <el-button :icon="CirclePlus" type="primary" @click="addGroup">创建小组</el-button>
            <el-button :icon="Share" type="success" @click="joinByCode">通过邀请码加入</el-button>
        </div>
    </div>
    <el-empty v-if="currentGroups.length === 0" description="没有找到小组哦"></el-empty>
    <div v-else class="group-list">
        <el-row v-for="i in rowRange" :key="i" :gutter="40" style="height: 250px;margin-top: 10px;margin-bottom: 10px;">
            <el-col v-for="j in 3" :key="(i-1) * 3 + j" :span="24 / colNum" class="col">
                <el-card v-if="calcIndex(i, j) < currentGroups.length" class="group-card">
                    <div class="card-container">
                        <div style="font-size: 20px;">
                            <i style="margin-right: 10px;" :class="`bi bi-${iconMap[thisGroup(i, j).type]}`"></i>
                            <span>{{ thisGroup(i, j).name }}</span>
                            <span style="font-size: 16px;color: gray;float: right;">{{ '3 / 4' }}</span>
                            <div style="color: gray;font-size: 16px;margin-top: 10px;">{{ thisGroup(i,j).organName }}</div>
                        </div>
                        <div class="group-desc">{{ thisGroup(i,j).description }}</div>
                        <div style="display: flex;">
                            <el-button :icon="Link" style="margin-left: auto;" @click="shareGroup(thisGroup(i, j).id)">分享给朋友</el-button>
                            <el-button type="success" :icon="Message" @click="joinGroup(thisGroup(i, j).id)">申请加入</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div v-show="currentGroups.length >= 9" class="pagination">
            <el-pagination
                layout="prev, pager, next"
                :page-size="9"
                :total="9"
            />
        </div>
    </div>
    
    <el-dialog v-model="createGroup" title="创建我的小组" width="40%"
            :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="group" label-width="auto" :rules="rules" ref="formRef">
            <el-form-item label="小组名" prop="name">
                <el-input v-model="group.name" placeholder="不超过15个字" :maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="小组类型" prop="type">
                <el-select v-model="group.type" placeholder="请选择小组类型">
                    <el-option label="比赛竞技" value="contest" />
                    <el-option label="娱乐游戏" value="ent" />
                    <el-option label="户外活动" value="outdoor" />
                    <el-option label="其他" value="other" />
                </el-select>
            </el-form-item>
            <el-form-item label="小组人数" prop="capacity">
                <el-input-number v-model="group.capacity" :min="2" :max="999" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="所属组织" prop="organName">
                <template #label="{label}">
                    <div style="text-align: right;">{{ label }}
                        <el-tooltip content="例如比赛、社团、协会等" placement="top">
                            <i class="bi bi-question-circle click-icon"></i>
                        </el-tooltip>
                    </div>
                </template>
                <el-input v-model="group.organName" placeholder="默认为自由组队" :maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="小组描述" prop="description">
                <el-input type="textarea" v-model="group.description" placeholder="不超过50个字" :maxlength="50"
                    resize="none" :rows="3"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button style="margin-left: 20px;" type="primary" @click="submitForm">提交</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated } from 'vue';
import {useRouter, onBeforeRouteUpdate} from 'vue-router';
import { Search, CirclePlus, Share, Message, Link } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStore } from '../stores/user.js';
import axios from 'axios';

const router = useRouter()
const userStore = useUserStore()

const searchValue = ref('')
const searchType = ref('')
const colNum = ref(3)
const iconMap = {course: 'book course-color', contest: 'trophy contest-color', ent: 'controller ent-color',
                 outdoor: 'flag outdoor-color', other: 'lightbulb other-color'}

const formRef = ref()
const rules = {
    name: [
        { required: true, message: '请输入小组名', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '请选择小组类型', trigger: 'blur' }
    ],
    capacity: [
        { required: true, message: '请输入小组人数', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入小组描述', trigger: 'blur' }
    ]
}

const group = reactive({
    name: '',
    description: '',
    type: '',
    organName: '',
    capacity: 4
})
const createGroup = ref(false)

const groupInfo = [
    {id: 'g111', name: '周六江心洲骑行', organName: '自由组队',description: '快来加入我们吧绝代风华打卡粉色的回复收到就粉色的尽快发货多少分发动机凤凰大街客服发的是尽快发货是的尽快发货时可救基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'outdoor'},
    {id: 'g222', name: '锟斤拷烫烫烫小队', organName: '2023EL程序竞赛交互组',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'contest'},
    {id: 'g333', name: '书院联谊活动', organName: '开甲书院',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'other'},
    {id: 'g444', name: '狼人杀时间', organName: '桌游社',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'ent'},
    {id: 'g555', name: '栖霞山赏枫', organName: '自由组队',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'outdoor'},
    {id: 'g666', name: '麻将四缺二', organName: '自由组队',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'ent'},
    {id: 'g777', name: '北欧文化研讨会', organName: '文学社',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'other'},
    {id: 'g888', name: '\"last one\"项目', organName: '网易雷火makers游戏开发大赛',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'contest'},
    {id: 'g999', name: '拥抱分你一半志愿者招募', organName: '软件学院心晴工作站',description: '快来加入我们吧绝代风华打卡基地车都会算法大喊大叫你才找小姐的地方打算妲己', leader: '111', type: 'other'},
]

const currentGroups = reactive([])

const rowRange = computed(() => {
    return Math.ceil(currentGroups.length / colNum.value)
})

onActivated(() => {
    searchFilter(router.currentRoute.value.query)
})

onBeforeRouteUpdate(to => {
    searchFilter(to.query)
})

function searchFilter(query) {
    currentGroups.length = 0
    if ('id' in query) {
        currentGroups.splice(0, 0, ...groupInfo.filter(group => group.id === query.id))
        return
    }
    if ('content' in query && 'type' in query) {
        let contentGroups = groupInfo.filter(group => group.name.includes(query.content) || group.description.includes(query.content) || group.organName.includes(query.content))

        let typeGroups = contentGroups.filter(group => group.type === query.type)
        console.log('content groups', typeGroups)
        // 检索和content相关的小组
        currentGroups.splice(0, 0, ...contentGroups.filter(group => group.type === query.type))
        return
    }
    if ('content' in query) {
        // 检索和content相关的小组
        currentGroups.splice(0, 0, ...groupInfo.filter(group => group.name.includes(query.content) || group.description.includes(query.content) || group.organName.includes(query.content)))
    }
    if ('type' in query) {
        currentGroups.splice(0, 0, ...groupInfo.filter(group => group.type === query.type))
    }
    // 如果to.query无任何参数，显示所有小组
    if (Object.keys(query).length === 0) {
        currentGroups.splice(0, 0, ...groupInfo)
    }
}

function calcIndex(i, j) {
    return (i - 1) * colNum.value + j - 1
}

function thisGroup(i, j) {
    return currentGroups[calcIndex(i, j)]
}

function searchGroup() {
    console.log('search', searchValue.value, searchType.value)
    let query = {}
    if (searchValue.value) {
        query.content = searchValue.value
    }
    if (searchType.value && searchType.value !== 'all') {
        query.type = searchType.value
    }
    router.push({query})
}

function addGroup() {
    group.leaderId = userStore.getUser().id
    createGroup.value = true
    console.log(createGroup.value)
}

function submitForm() {
    formRef.value.validate((valid) => {
        if (valid) {
            let newGroup = {...group}
            if (newGroup.organName === '') {
                newGroup.organName = '自由组队'
            }
            console.log('new group', newGroup)
            newGroup['leaderId'] = userStore.getUser().id
            axios.post('http://localhost:8080/group', newGroup).then(
                res => {
                    ElMessage.success('创建小组成功')
                    newGroup['id'] = res.data
                    groupInfo.push(newGroup)
                    currentGroups.push(newGroup)
                    router.push({query: {}})
                }, err => {
                    console.log(err)
                    ElMessage.error('创建小组失败')
            })
            createGroup.value = false
            formRef.value.resetFields()
        }
    })
}

function cancel() {
    createGroup.value = false
    formRef.value.resetFields()
}

function joinGroup(id) {
}

function joinByCode() {
    ElMessageBox.prompt('请输入邀请码', '加入小组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 限制输入为6位数字或大写字母
        inputPattern: /^[A-Z0-9]{6}$/,
        inputErrorMessage: '邀请码格式错误'
    }).then(({value}) => {
        console.log(value)
        axios({
            method: 'put',
            url: 'http://localhost:8080/group/invite',
            params: {
                code: value,
                userId: userStore.getUser().id
            }
        }).then(res => {
            ElMessage.success('加入小组成功')
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                ElMessage.error('小组已满员')
                return
            } else {
                ElMessage.error('邀请码错误，找不到该小组')
            }
        })
    })
}

function shareGroup(id) {
    // 将分享链接复制到剪切板中
    let url = 'http://localhost:5173/discovery?id=' + id
    navigator.clipboard.writeText(url).then(function() {
        ElMessage.success('分享链接已复制到剪切板')
    }, function(err) {
        ElMessage.error('分享链接复制失败')
    });
}

</script>

<style scoped>
.search {
    width: 100%;
    height: 350px;
    background-image: url('../assets/pic/discovery-search.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.headline {
    font-size: 70px;
    font-weight:700;
    color: white;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    /* text-align: center; */
}

.search-input {
    width: 40%;
    height: 50px;
    border-radius: 25px;
    margin-bottom: 30px;
}

.search-button {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 20%;
}

.col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.group-list {
    padding-left: 200px;
    padding-right: 200px;
    overflow: auto;
}

.group-card {
    height: 90%;
    width: 100%;
    /* margin-top: 10px; */
}

.card-container {
    height: 190px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.group-desc {
    /* margin-top: 10px; */
    color: gray;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 限制最多显示3行文本 */
    -webkit-box-orient: vertical;
}

.pagination {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
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

.click-icon:hover {
    cursor: pointer;
}

</style>

<style>
.search-input > .el-input-group__prepend > .el-select > .select-trigger > .el-input > .el-input__wrapper {
    height: 48px;
    font-size: 16px;
}

.search-input > .el-input__wrapper {
    height: 48px;
    font-size: 16px;
}


/* .el-dialog__footer {
    text-align: left;
} */
</style>