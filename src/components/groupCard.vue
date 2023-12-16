<template>
  <div class="recently-viewed">
    <span class="title">推荐课程</span>
    <div class="carousel-container">
      <el-empty description="最近暂无浏览" v-if="recentlyViewedItems.length==0" :image-size="100"/>
      <el-carousel :autoplay="false" height="200px" style="width: 95%" v-if="recentlyViewedItems.length!=0" indicator-position="none"> 
        <el-carousel-item  v-for="item in recentlyViewedItems" :key="item">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            @click="gotoDetails(item.id)"
          >
            <el-image :src="item.url" class="image" :fit="'cover'" />
            <div class="text">
              <el-text
                tag="b"
                size="large"
                style="font-size: 16px; color: #1a1a1a"
                >{{ item.name }}</el-text
              >
              <br />
              <el-text class="t">
                <i class="bi bi-person-fill"></i>任课老师：{{ item.teacher }}
              </el-text>
              <br />
              <div class="container">
                <el-text class="mx-1" style="font-size: 13px" type="success">
                  <i class="bi bi-check"></i>
                  已加入
                </el-text>
                <el-text class="t" type="info">2023级</el-text>
              </div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      recentlyViewedItems: [
        {
          name:"计算机网络",
          teacher:"刘峰",        
          url: "https://p5.itc.cn/images01/20220715/371189fc8148416db6f2430b2f1ce0f4.jpeg",
          id:"6570935c3d2fda67348df83c"
        },
        {
          name:"软件工程与计算-I",
          teacher:"刘钦",        
          url: "https://seec-portal.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E4%B8%8E%E8%AE%A1%E7%AE%97%E4%B8%80%EF%BC%88%E6%99%BA%E8%BD%AF%E9%99%A2%EF%BC%89.jpg",
          id:"657098cf3d2fda67348df83e"
        },
        {
          name:"数据管理基础",
          teacher:"贝佳",        
          url: "https://th.bing.com/th/id/R.9a3caa3ce82edf2eee34d091aa165dbe?rik=U0IBGZrLnTEXTA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-AKo900dON3o%2fTjYq3MxEv9I%2fAAAAAAAAACA%2fqWocOFb77iM%2fs1600%2fmysql_logo.png&ehk=ZqfIZ%2f8moolXZxveplNHSzn5I25DwY5jMBDSDZTi1Fo%3d&risl=&pid=ImgRaw&r=0",
          id:"657d19ee850a9a6ce03c4d73"
        },
        {
          name:"商业模式设计",
          teacher:"匡宏宇",        
          url: "https://epiprodux.com/blog/wp-content/uploads/2021/12/unnamed.jpg",
          id:"657d1c5e850a9a6ce03c4d74"
        },
        {
          name:"人机交互",
          teacher:"冯桂焕",        
          url: "https://picss.sunbangyan.cn/2023/12/16/70b5e85a1db920d05261a196459b4eed.jpeg",
          id:"65717ab92e5f087258a68948"
        },
      ],
      maxItems: 5,
    };
  },
  methods: {
  },
  setup() {
    const router = useRouter();
    function gotoDetails(groupid){
      router.push({ path: "/course-detail", query: { id:  groupid} });
    };
    return {
      gotoDetails,
    };
  },
};
</script>


<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.container {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.t {
  font-size: 13px;
  color: #999;
}
.text {
  margin-top: 10px;
  margin-left: 10px;
}
.image {
  width: 100%;
  display: block;
  height: 120px;
}
</style>