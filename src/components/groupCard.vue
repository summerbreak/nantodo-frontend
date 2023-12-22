<template>
  <div class="recently-viewed">
    <span class="title">推荐课程</span>
    <div class="carousel-container">
      <el-empty description="暂无浏览" v-if="recentlyViewedItems.length==0" :image-size="100"/>
      <el-carousel :autoplay="false" height="253px" style="width: 95%" v-if="recentlyViewedItems.length!=0" indicator-position="none"> 
        <el-carousel-item  v-for="item in recentlyViewedItems" :key="item">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px', height: '250px' }"
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
                <el-text class="t" type="info">{{ item.grade }}级</el-text>
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
          name:"商业模式设计",
          teacher:"匡宏宇",        
          url: "https://epiprodux.com/blog/wp-content/uploads/2021/12/unnamed.jpg",
          id:"657d1c5e850a9a6ce03c4d74",
          grade: 2021
        },
        {
          name:"人机交互",
          teacher:"冯桂焕",        
          url: "https://picss.sunbangyan.cn/2023/12/16/70b5e85a1db920d05261a196459b4eed.jpeg",
          id:"65717ab92e5f087258a68948",
          grade: 2021
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
      router.push({ path: "/course-detail", query: { id:  groupid,selected:true} });
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
  height: 170px;
}
</style>