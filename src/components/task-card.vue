<template>
  <div class="task-card" :class="{ completed: isCompleted }">
    <div class="header">
      <div class="icon-and-title">
        <div class="star">
          <i
            @click="toggleStar"
            :class="isStarred ? 'bi bi-star-fill' : 'bi bi-star'"
            :style="`font-size: 25px; color: ${
              isStarred ? '#ffe4b5' : '#888'
            }; font-style: normal;`"
          ></i>
        </div>

        <h2 class="title">{{ myTitle }}</h2>
      </div>

      <p class="date">发布日期 <br/>{{ myReleaseTime }}</p>
    </div>
    <div class="content">
      <p class="content-text">{{ myContent }}</p>
    </div>
    <div class="group-name">
      <p>来自移动互联网</p>
    </div>
    <p class="deadline">截止日期 <br/> {{ myDeadline }}</p>
    <div class="completion-overlay" v-if="isCompleted">
      <i
        class="bi bi-check-lg"
        style="font-size: 150px; color: #a9a9a9"
        @click="undoCompletion"
      ></i>
    </div>
    <div class="footer">
      <el-tooltip
        class="box-item"
        content="Chatgpt描述"
        placement="top-start"
        effect="light"
      >
        <button @click="handleButtonClick('Button 1')">
          <i class="bi bi-robot"></i>
        </button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        content="更多详情"
        placement="top-start"
        effect="light"
      >
        <button @click="moreDetails">
          <i class="bi bi-three-dots"></i></button
      ></el-tooltip>
      <el-tooltip
        class="box-item"
        content="完成"
        placement="top-start"
        effect="light"
      >
        <button @click="completeTask">
          <i class="bi bi-check-lg"></i></button
      ></el-tooltip>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
  >
    <p>发布日期 {{ releaseTime }}</p>
    <span>{{ content }}</span>
    <p class="deadline">截止日期 {{ deadline }}</p>
    <p>来自移动互联网</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">已知晓</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script>
import axios from 'axios';

export default {
  props: {
    title: String,
    content: String,
    releaseTime: String,
    deadline: String,
    starred: Boolean,
    done:Boolean,
    id:String,
    userId:String
  },
  data() {
    return {
      isStarred: this.starred,
      isCompleted: this.done,
      myTitle: this.title,
      myContent: this.content,
      myReleaseTime: this.releaseTime,
      myDeadline: this.deadline,
      myId: this.id,
      myUserId: this.userId,
      dialogVisible: false,
    };
  },
  methods: {
    // 处理按钮点击事件
    handleButtonClick(buttonName) {
      console.log(`${buttonName} clicked`);
    },
    toggleStar() {
      this.isStarred = !this.isStarred;
      this.updateTask();
    },
    completeTask() {
      this.isCompleted = true;
      this.updateTask();
    },
    undoCompletion() {
      this.isCompleted = false;
      this.updateTask();
    },
    moreDetails() {
      // 处理更多详情按钮点击逻辑
      this.dialogVisible = true; // 显示 el-dialog
    },
    handleClose(done) {
      // 处理 dialog 关闭前的逻辑
      console.log("Dialog is closing");
      done(); // 关闭 dialog
    },
    updateTask() {
      // 处理更新任务逻辑
      axios
        .put(`http://localhost:8080/task?id=${this.myId}`, {
          id: this.myId,
          title: this.myTitle,
          content: this.myContent,
          releaseTime: this.myReleaseTime,
          deadline: this.myDeadline,
          starred: this.isStarred,
          done: this.isCompleted,
          userId: this.myUserId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
  
<style scoped>
.completion-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* 调整覆盖层的透明度和颜色 */
}
.task-card.completed {
  background-color: #eee;
  position: relative;
}
.task-card button {
  background-color: #eee;
}
.star :hover {
  cursor: pointer;
}
.group-name {
  font-size: 15px;
}
.deadline {
  color: #ff6666; /* 淡红色 */
  font-size: 15px;
  margin-top: 0%;
}
.icon-and-title {
  display: flex;
  flex-direction: row;
}
.content {
  font-size: 15px;
}
.content-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  max-height: 3em; 
}
.task-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 80%;
  background-color: white;
  margin-left: 50px;
}

.title {
  margin: 0;
  font-size: 24px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.date {
  color: #666;
  font-size: 15px;
  margin-left: 3%;
  margin-top: 0%;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.footer button {
  width: 50px;
  height: 50px;
  font-size: 15px;
  flex: 1;
  border-radius: 4px;
}
.outside {
  margin: 0 100px 5px;
  padding: 0;
}
.footer button:not(:last-child) {
  margin-right: 8px; 
}
</style>