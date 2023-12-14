<template>
  <div class="recently-viewed">
    <span class="title">最近浏览</span>
    <div class="carousel-container">
      <el-empty description="暂无浏览" v-if="recentlyViewedItems.length==0" :image-size="100"/>
      <el-carousel :autoplay="false" height="200px" style="width: 95%" v-if="recentlyViewedItems.length!=0" indicator-position="none"> 
        <el-carousel-item  v-for="item in recentlyViewedItems" :key="item">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            @click="gotoDetails"
          >
            <el-image :src="url" class="image" :fit="'cover'" />
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
          name:"软件工程",
          teacher:"张三",
        },
        {
          name:"数学",
          teacher:"李四",
        },
        {
          name:"英语",
          teacher:"王五",
        },
        {
          name:"物理",
          teacher:"赵六",
        },
        {
          name:"化学",
          teacher:"孙七",
        },
      ],
      maxItems: 5,
      url: "src/assets/pic/OIP.png",
    };
  },
  methods: {
  },
  setup() {
    const router = useRouter();
    const gotoDetails = () => {
      router.push({ path: "/course-detail"});
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