<template>
  <div class="task-card" :class="{ completed: isCompleted }">
    <div class="header" @click="moreDetails">
      <div class="icon-and-title">
        <div class="star">
          <i @click="toggleStar" :class="isStarred ? 'bi bi-star-fill' : 'bi bi-star'" :style="`font-size: 25px; color: ${isStarred ? '#ffe4b5' : '#888'
            }; font-style: normal;`"></i>
        </div>
        <h2 class="title" >{{ myTitle }}</h2>
      </div>

      <div class="date" @click="moreDetails">截止时间: {{ myDeadline.toLocaleString('af') }}</div>
    </div>
    <span class="group-name">
      来自
      <router-link tag="button" :to="{ path: '/group', query: { id: groupId } }">
        {{ groupName }}
      </router-link>
    </span>
    <p class="content-text" @click="moreDetails">{{ myContent }}</p>
    <div class="completion-overlay" v-if="isCompleted">
      <i class="bi bi-check-lg" style="font-size: 150px; color: #a9a9a9" @click="undoCompletion"></i>
    </div>
    <div class="urgen-alarm" v-if="urgent&&!isCompleted">
      <img src="../assets/pic/urgent.png" class="urgent-img">
    </div>
    <div class="footer">
      <el-popover placement="bottom" trigger="click" :width="200">
        <template #reference>
          <div>
            <el-tooltip class="box-item"
              content="AI建议"
              placement="top"
              effect="light">
              <button @click="askChatGPT">
                <i class="bi bi-robot" style="font-size: 20px;"></i>
              </button>
            </el-tooltip>
          </div>
        </template>
        <el-skeleton v-if="aiSuggestion.length === 0" :rows="2" animated />
        <div v-else>{{ aiSuggestion }}</div>
      </el-popover>

      <el-tooltip class="box-item"
        content="写作业"
        placement="top"
        effect="light"
      >
        <button @click="doHomework">
          <i class="bi bi-pencil-square" style="font-size: 20px;"></i></button
      ></el-tooltip>
      <el-tooltip class="box-item"
        content="完成"
        placement="top"
        effect="light"
      >
        <button @click="completeTask">
          <i class="bi bi-check-lg" style="font-size: 20px;"></i></button
      ></el-tooltip>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose" center>
    <template #header>
      <h2>{{title}}</h2>
      <div class="date">发布时间: {{ myReleaseTime.toLocaleString('af') }}</div>
    </template>
    <span class="content">{{ content }}</span>
    <p><div class="deadline">截止日期: {{ myDeadline.toLocaleString('af') }}</div><div>来自{{groupName}}</div></p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">已知晓</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showCollaborate" :title="`多人协作 - ${groupName}`" width="40%"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <CollabTools :tools="groupInfo.tools" :is-admin="false"></CollabTools>
  </el-dialog>
</template>
  
<script>
import axios from 'axios';
import { useDonelistStore } from '../stores/donelist.js';
import { ElMessage } from 'element-plus';


export default {
  props: {
    title: String,
    content: String,
    releaseTime: String,
    deadline: String,
    starred: Boolean,
    done: Boolean,
    id: String,
    userId: String,
    groupId: String
  },
  data() {
    return {
      isStarred: this.starred,
      isCompleted: this.done,
      myTitle: this.title,
      myContent: this.content,
      myReleaseTime: new Date(this.releaseTime),
      myDeadline: new Date(this.deadline),
      myId: this.id,
      myUserId: this.userId,
      dialogVisible: false,
      urgent: false,
      aiSuggestion: '',
      groupName: '',
      groupInfo: {tools: []},
      isOvertime: false,
      showCollaborate: false            
    };
  },
  mounted() {
    this.setgroupName();
    this.urgent = this.isUrgent();
  },
  methods: {
    // 处理按钮点击事件
    askChatGPT() {
      if (this.aiSuggestion.length === 0) {
        const xhr = new XMLHttpRequest();
        let content = "请针对下述任务描述给出30-50字的建议：" + this.myContent;
        xhr.open('GET', `http://47.115.201.228:8080/ai/chatgpt?content=${content}&username=DEFAULT`);
        xhr.setRequestHeader('Content-Type', 'text/event-stream');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 3) {
            this.aiSuggestion = xhr.responseText;
          }
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.aiSuggestion = xhr.responseText;
            }
          }
          if (xhr.status !== 200) {
            ElMessage.error('AI接口访问失败，请检查网络设置');
          }
        };
        xhr.send();
      }
    },
    toggleStar() {
      this.isStarred = !this.isStarred;
      this.updateTask();
    },
    doHomework() {
      this.showCollaborate = true;
    },
    completeTask() {
      this.isCompleted = true;
      const store = useDonelistStore();
      //增加useDonelistStore中change的值
      store.change.done++;
      this.updateTask();
    },
    undoCompletion() {
      this.isCompleted = false;
      const store = useDonelistStore();
      store.change.done--;
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
          releaseTime: this.releaseTime,
          deadline: this.deadline,
          starred: this.isStarred,
          done: this.isCompleted,
          userId: this.myUserId,
          groupId: this.groupId
        })
        .then((res) => {
          console.log(res);
          this.urgent = this.isUrgent();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setgroupName() {
      console.log("groupid", this.groupId);
      axios
        .get(`http://localhost:8080/group?id=${this.groupId}`)
        .then((res) => {
          console.log('group', res);
          this.groupName = res.data.name;
          this.groupInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isUrgent() {
      if (this.isCompleted) {
        return false
      }
      const now = new Date()
      const deadline = new Date(this.myDeadline)
      if (now>deadline) {
        this.isOvertime = true
        return true
      }
      return deadline - now < 3 * 24 * 60 * 60 * 1000
    }
  }
};
</script>
  
<style scoped>
.urgent-img{
  width: 150px;
  transform: rotate(15deg);
  opacity: 0.7;
}
.completion-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  /* 调整覆盖层的透明度和颜色 */
}

.urgen-alarm {
  position: absolute;
  top: -10px;
  right: 0px;
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

.unurgent {
  font-size: 15px;
  margin-top: 0%;
}

.deadline {
  color: #ff6666;
  /* 淡红色 */
}

.icon-and-title {
  display: flex;
  flex-direction: row;
}

.content {
  font-size: 16px;
  color: #000;
}

.content-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-height: 1.5em;
  /* 行高，根据需要调整 */
  height: 3em;
  font-size: 18px;
}

.task-card {
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 80%;
  background-color: white;
  margin-left: 50px;
  box-shadow: var(--el-box-shadow-light);
  position: relative;
}

.title {
  margin: 0;
  font-size: 22px;
  margin-left: 10px;
  white-space: nowrap;
  /* 防止文本换行 */
  overflow: hidden;
  /* 隐藏溢出的文本 */
}

.date {
  color: #666;
  font-size: 15px;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.footer button {
  width: 100px;
  height: 50px;
  font-size: 15px;
  border-radius: 4px;
}

.outside {
  margin: 0 100px 5px;
  padding: 0;
}
</style>

<style>
.group-name a {

  color: coral;
  font-weight: 400;
}
</style>