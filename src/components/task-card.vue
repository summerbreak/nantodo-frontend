<template>
  <div class="task-card" :class="{ completed: isCompleted || isOvertime}">
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

      <p class="date">发布日期 <br/>{{ myReleaseTime.toLocaleString('af') }}</p>
    </div>
    <div class="content">
      <p class="content-text">{{ myContent }}</p>
    </div>
    <div class="group-name">
      来自
      <router-link tag="button" :to="{path: '/group', query: {id: groupId}}">
        {{groupName}}
      </router-link>
    </div>
    <p :class="{deadline: urgent}">截止日期 <br/> {{ myDeadline.toLocaleString('af') }}</p>
    <div class="completion-overlay" v-if="isCompleted">
      <i
        class="bi bi-check-lg"
        style="font-size: 150px; color: #a9a9a9"
        @click="undoCompletion"
      ></i>
    </div>
    <div class="footer">
      <el-popover placement="bottom" trigger="click" :width="200">
        <template #reference>
          <div>
            <el-tooltip
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

      <el-tooltip
        content="更多详情"
        placement="top"
        effect="light"
      >
        <button @click="moreDetails">
          <i class="bi bi-three-dots" style="font-size: 20px;"></i></button
      ></el-tooltip>
      <el-tooltip
        content="完成"
        placement="top"
        effect="light"
      >
        <button @click="completeTask">
          <i class="bi bi-check-lg" style="font-size: 20px;"></i></button
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
    <p :class="{deadline: urgent}">截止日期 {{ deadline }}</p>
    <p>来自{{groupName}}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">已知晓</el-button>
      </span>
    </template>
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
    done:Boolean,
    id:String,
    userId:String,
    groupId:String
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
      isOvertime: false                    
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
    setgroupName(){
      console.log("groupid", this.groupId);
      axios
        .get(`http://localhost:8080/group?id=${this.groupId}`)
        .then((res) => {
          console.log('group',res);
          this.groupName = res.data.name;
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
.unurgent{ 
  font-size: 15px;
  margin-top: 0%;
}
.deadline {
  color: #ff6666; /* 淡红色 */
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
  width: 100px;
  height: 50px;
  font-size: 15px;
  border-radius: 4px;
}

.outside {
  margin: 0 100px 5px;
  padding: 0;
}
/* .footer button:not(:last-child) {
  margin-right: 8px; 
} */
</style>