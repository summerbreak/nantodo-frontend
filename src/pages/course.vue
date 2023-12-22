<template>
  <!--  <el-scrollbar max-height="1000px" style="margin-bottom: 0;margin-top: 0">-->
  <el-row style="margin-top: 10px">
    <el-col>
      <el-text tag="ins" class="title">我的课程</el-text>
    </el-col>
  </el-row>
  <!-- <invitation-button /> -->
  <div v-loading="isLoading" element-loading-text="加载中..." element-loading-background="transparent">
    <div v-if="userCourses.length!==0">
      <el-row class="outside">
        <el-col
            v-for="(o, index) in userCourses"
            :key="index"
            :span="6"
            :offset="0"
        >
          <course-grid :courseInfo="o"/>
        </el-col>
      </el-row>
    </div>
    <el-empty v-else-if="!isLoading">
      <template #image>
        <svg t="1702088362166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2084" data-spm-anchor-id="a313x.search_index.0.i9.34973a81NrY7xU" width="200" height="200">
          <path
              d="M879.616 768.135l-86.299-253.268-3.192-9.367-6.277-18.41-3.543-10.408-5.922-17.408v60.037l5.922 17.408 3.543 10.407 6.277 18.41 3.192 9.368 67.457 197.986c1.077 3.182-1.056 6.51-4.778 7.437l-62.668 15.613-3.193 0.797-6.276 1.563-3.543 0.877-5.923 1.478v17.478l5.923-1.482 3.543-0.877 6.276-1.564 3.193-0.797 68.179-16.979a26.29 26.29 0 0 0 15.922-10.936 19.894 19.894 0 0 0 2.187-17.363z m-203.388 56.946l-32.46 8.098-32.462 8.094-31.808 7.922-33.69 8.385-33.677 8.396-109.35 27.239c-3.721 0.921-7.606-0.908-8.698-4.08l-7.884-23.132-2.868-8.397-2.854-8.382-2.705-7.924-5.41-16.186h-20.618l5.41 16.186 2.705 7.924 2.854 8.382 2.855 8.39 9.466 27.838a23.897 23.897 0 0 0 12.843 13.62 30.72 30.72 0 0 0 20.35 1.827l174.03-43.344 33.69-8.396 33.69-8.389 31.795-7.885 64.922-16.192zM257.867 262.554l-9.47 2.313-3.462 0.868-9.83 2.488-9.82 2.45-31.975 7.957c-14.113 3.532-22.221 16.162-18.138 28.243l50.042 147.066 9.89 28.822 9.804 28.797 3.463 10.163 9.466 27.757 9.471 27.75v-59.932l-9.47-27.75-9.467-27.757-3.437-10.24-9.83-28.797-9.82-28.809-31.254-91.76c-1.078-3.175 1.06-6.501 4.771-7.434l26.484-6.594 9.82-2.436 9.804-2.458 3.463-0.87 9.466-2.312 9.471-2.314v-17.553z m447.345-6.36l-5.285-15.531-1.354-3.812-0.647-1.895-4.916-14.412-0.135-0.392-4.054-12.098-0.19-0.54-8.952-26.289c-4.145-12.058-18.911-18.984-33.031-15.497l-167.78 41.794-6.263 1.563-26.265 6.535-7.424 1.848-25.038 6.246h70.167l25.05-6.232 7.423-1.843 26.27-6.547 6.262-1.564 103.074-25.676a8.602 8.602 0 0 1 1.979-0.243 6.972 6.972 0 0 1 6.758 4.336l7.318 21.577 0.528 1.563 1.35 4.072 0.284 0.81 0.558 1.666 0.633 1.843 1.53 4.478 0.608 1.754 0.732 2.15 0.891 2.616 4.898 14.365 4.693 13.792-0.085-19.174 2.451 2.626 3.488 3.734 12.052 12.943 4.059 4.37z m0 0"
              fill="#707070" p-id="2085" data-spm-anchor-id="a313x.search_index.0.i10.34973a81NrY7xU" class=""></path>
          <path
              d="M793.317 327.9v491.402c0 12.137-11.507 21.973-25.702 21.973H274.099c-14.193 0-25.702-9.836-25.702-21.973V229.5c0-12.137 11.509-21.977 25.702-21.977h414.708v16.191H274.099a7.373 7.373 0 0 0-4.787 1.696 5.388 5.388 0 0 0-1.983 4.09v589.803c0 3.191 3.029 5.78 6.766 5.78h493.517a7.386 7.386 0 0 0 4.783-1.69 5.392 5.392 0 0 0 1.983-4.09V325.161h16.384z m0 0"
              fill="#707070" p-id="2086" data-spm-anchor-id="a313x.search_index.0.i8.34973a81NrY7xU" class=""></path>
          <path
              d="M793.696 328.237l-0.313-0.337-2.56-2.739-86.393-92.681-11.483-12.328-2.546-2.73-0.403-0.44-1.127-1.154v-0.059l-0.11-0.116-0.079-0.094a13.49 13.49 0 0 0-8.873-4.067 13.878 13.878 0 0 0-2.222 0 15.064 15.064 0 0 0-3.149 0.574 13.323 13.323 0 0 0-3.993 1.946 11.924 11.924 0 0 0-1.844 1.653 9.897 9.897 0 0 0-2.704 6.739v1.307l0.497 110.687c0.046 5.98 5.685 10.825 12.675 10.893l36.194 0.234 8.021 0.056h2.216l10.24 0.08h7.318l31.391 0.205 9.157 0.06h0.314c4.848-0.09 9.216-2.513 11.285-6.262a9.66 9.66 0 0 0-1.521-11.433z m-56.171 1.24h-27.863l-24.428-0.163-0.323-72.499-0.08-19.173 2.447 2.623 3.492 3.736 12.05 12.941 4.056 4.372 11.484 12.13 52.428 56.252zM443.47 358.911h-90.089a23.202 23.202 0 0 0-23.265 23.08v89.406a23.202 23.202 0 0 0 23.265 23.08h90.09a23.211 23.211 0 0 0 23.275-23.08V381.99a23.211 23.211 0 0 0-23.275-23.08z m61.258 6.872H713.61v20.8H504.73z m0 101.023H713.61v20.8H504.73zM330.116 574.706h381.707v20.8H330.116z m-1.27 101.007h383.487v20.8H328.845z m0 0"
              fill="#707070" p-id="2087" data-spm-anchor-id="a313x.search_index.0.i11.34973a81NrY7xU" class=""></path>
          <path
              d="M358.725 376.182h82.86q10.342 0 10.342 9.743v78.103q0 9.741-10.342 9.743h-82.86q-10.343 0-10.343-9.743v-78.103q0-9.742 10.343-9.743z m0 0"
              fill="#F2F2F2" p-id="2088"></path>
          <path
              d="M360.67 382.944h74.188q12.288 0 12.288 12.288v74.188q0 12.288-12.288 12.288H360.67q-12.288 0-12.288-12.288v-74.188q0-12.288 12.288-12.288z"
              fill="#F2F2F2" p-id="2089"></path>
        </svg>
      </template>
      <template #description>
        <el-text size="large">暂无课程</el-text>
      </template>
    </el-empty>
  </div>
  <div class="all-courses">
    <el-text tag="ins" class="title">全部课程</el-text>
    <span>
      <el-row>
        <el-col :span="6" style="height: 100%;margin-right: 10px">
          <el-select v-model="gradeValue" placeholder="选择开课年级" size="large">
      <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
      />
      </el-select>
        </el-col>
        <el-col :span="6">
        <el-check-tag :checked="ifPossible" @change="choosePossible" class="possibleCourse">仅看可加入的课程
        </el-check-tag>
      </el-col>
        <el-col :span="10">
          <course-search @search="getCourses"/>
        </el-col>
      </el-row>
    </span>
  </div>
  <div style="margin-bottom: 15px;margin-top: 0">
    <div v-loading="isLoading" element-loading-text="加载中..." element-loading-background="transparent" >
      <el-row class="outside">
        <el-col
            v-for="(o, index) in showCourses.slice((page-1)*8,page*8)"
            :key="index"
            :span="6"
            :offset="0"
        >
          <course-grid :courseInfo="o"/>
        </el-col>
      </el-row>
    </div>
      <el-pagination v-model:current-page="page" :page-size="8" background layout="prev, pager, next" :total="showCourses.length" />

  </div>
  <!--  </el-scrollbar>-->
</template>
<script setup>
import {ref, onActivated, watch} from "vue";
import {useUserStore} from "../stores/user.js";
import CourseSearch from "../components/course-search.vue";
import CourseGrid from "../components/course-grid.vue";
import axios from "axios";
import InvitationButton from "../components/course-button.vue";
const page=ref(1)
const allCourses = ref([])
const userCourses = ref([])
const userInfo = ref({})
const isLoading = ref(true)
const ifPossible = ref(false)
const showCourses = ref([])
const searchText = ref('')
const gradeValue = ref('全部年级')
let user = useUserStore().getUser()

const options = [{value: '全部年级'}, {value: '2020'}, {value: '2021'}, {value: '2022'}, {value: '2023'}]

watch(gradeValue, (newValue, oldValue) => {
  getCourses(searchText.value)
  if (newValue === '' || newValue === '全部年级') {

  } else {
    showCourses.value = showCourses.value.filter(({grade}) => grade == newValue)
  }
})

onActivated(async () => {
  isLoading.value = true
  await axios.get('http://localhost:8080/course/allCourse').then(
      res => {
        allCourses.value.length = 0
        for (let i = 0; i < res.data.length; i++) {
          allCourses.value.push(res.data[i])
        }
      }
  )
  user = useUserStore().getUser()
  await axios.get(`http://localhost:8080/user?id=${user.id}`).then(
      res => {
        userInfo.value = res.data
      }
  ).catch(err => {
    console.log(err)
  })
  showCourses.value.length = 0
  showCourses.value.splice(0, 0, ...allCourses.value)

  userCourses.value.length = 0
  for (let i = 0, len = userInfo.value.courses.length; i < len; i++) {
    const result = allCourses.value.find(({id}) => id === userInfo.value.courses[i])
    userCourses.value.push(result)
  }
  isLoading.value = false
})

const getCourses = (text) => {
  searchText.value = text
  text = text.split("");
  let str = "(.*?)";
  showCourses.value.length = 0;
  let regStr = str + text.join(str) + str;
  let reg = RegExp(regStr, "i"); // 以mh为例生成的正则表达式为/(.*?)m(.*?)h(.*?)/i
  allCourses.value.map(item => {
    if (reg.test(item.name)) {
      if (ifPossible.value && item.open) {
        showCourses.value.push(item);
      } else if (!ifPossible.value) {
        showCourses.value.push(item);
      }
    }
  });
}

const choosePossible = () => {
  ifPossible.value = !ifPossible.value
  if (ifPossible.value) {
    let tmp = showCourses.value.concat()
    tmp = tmp.filter(item => item.open)
    showCourses.value.length = 0
    showCourses.value.splice(0, 0, ...tmp)
  } else {
    getCourses(searchText.value)
  }
}

</script>
<style scoped>
.title {
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bolder;
  color: #884A39;
}

.el-pagination {
  justify-content: center;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
}

.el-pagination.is-background :deep(.el-pager li) {
  /*对页数的样式进行修改*/
  background-color: #ffffff;
  color: #1a1a1a;
  margin: 5px;
  height: 40px;
  width: 40px;
}

.el-pagination.is-background :deep(.btn-next) {
  /*对下一页的按钮样式进行修改*/
  background-color: #ffffff;
  color: #1a1a1a;
  height: 40px;
  width: 40px;
}


.el-pagination.is-background :deep(.btn-prev) {
  /*对上一页的按钮样式进行修改*/
  background-color: #ffffff;
  color: #1a1a1a;
  height: 40px;
  width: 40px;
}

.el-pagination.is-background :deep(.el-pager :not(.is-disabled).is-active) {
  background-color: #ffffff;
  color: #3498ff;
  font-weight: bolder;
}

.outside {
  margin: 0 140px 5px;
  padding: 0;
}

.all-courses {
  display: flex;
  padding: 0;
  margin-outside: 0;
  justify-content: space-between;
}

.possibleCourse {
  line-height: 25px;
  text-align: right;
}
</style>