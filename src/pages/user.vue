
<template>
    <el-container style="display: flex; align-items: center;">
        <!-- <div class="aside"> -->
        <!-- <el-aside class="aside">
            <el-menu default-active="1" class="el-menu" active-text-color="orange" @select="menuSelect">
                <el-menu-item index="1" style="display: flex; justify-content: flex-end; font-size: 18px;">
                    <strong>
                        个人信息
                    </strong>
                </el-menu-item>

                <el-menu-item index="2" style="display: flex; justify-content: flex-end;font-size: 18px;">
                    <strong>
                        通用设置
                    </strong>
                </el-menu-item>
            </el-menu>
        </el-aside> -->
        <!-- </div> -->
        <el-main style="flex-direction:column; display: flex; align-items: center;justify-content:center;">
            <div class="box">
                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px;margin-right: 10%; ">
                    <h1>个人信息</h1>
                </el-text>
                <keep-alive>
                    <UserInfoComponent style="width: 50vh; margin: 0 auto;margin-left: 25%;" />
                </keep-alive>
            </div>

            <div class="box">
                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px;margin-right: 10%; ">
                    <h1>通用设置</h1>
                </el-text>
                <GeneralSetting style="width: 50vh; margin: 0 auto;margin-left: 25%;" />
            </div>
        </el-main>
    </el-container>
</template>
  
<style scoped>
.box {
    width: 70%;
    height: 100%;
    background-color: #fffffa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 20px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import GeneralSetting from '../components/GeneralSetting.vue';
import UserInfoComponent from '../components/UserInfoComponent.vue';
import { useUserStore } from '../stores/user.js'

const index = ref(1)
onMounted(() => {
    console.log('mounted', useUserStore().getUser())
})

const menuSelect = (key) => {
    index.value = key
    console.log(key);
}
</script>