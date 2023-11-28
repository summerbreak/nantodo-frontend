<template>
    <div class="card-container">
        <el-card class="card">
            <div class="card-top">
                <i class="bi bi-file-text"></i>
                <div style="margin-left: 10px;">小组作业</div>
            </div>
            <span style="color: gray;">与同学分工合作完成课程作业</span>
        </el-card>
        <el-card class="card">
            <div class="card-top">
                <i class="bi bi-people-fill"></i>
                <div style="margin-left: 10px;">组织活动</div>
            </div>
            <span style="color: gray;">召集好伙伴一起健身，桌游</span>
        </el-card>
        <el-card class="card">
            <div class="card-top">
                <i class="bi bi-trophy-fill"></i>
                <div style="margin-left: 10px;">比赛组队</div>
            </div>
            <span style="color: gray;">与同学分工合作完成课程作业</span>
        </el-card>
    </div>
    <div>
        <h2>快来加入南土豆</h2>
        <el-button type="success">登录</el-button>
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.card {
    margin-left: 20px;
    margin-right: 20px;
    padding: 0;
    height: 200px;
    width: 300px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
}
</style>