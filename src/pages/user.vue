
<template>
    <el-container style="display: flex; align-items: center; height: 100%">
        <div class="aside">
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
        </div>


        <el-main style="display: flex; align-items: center;justify-content:center; padding-right: 10%;">
            <div v-show="index == 1"
                style="width: 90%;height:100%;background-color: #fffffa;display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 20px;">

                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px;margin-right: 10%; ">
                    <h1>个人信息</h1>
                </el-text>
                <keep-alive>
                    <UserInfoComponent style="width: 50vh; margin: 0 auto;margin-left: 25%;" />
                </keep-alive>
            </div>


            <div v-show="index == 2"
                style="width: 90%;height:100%;background-color: #fffffa;display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 20px;">

                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px;margin-right: 10%; ">
                    <h1>通用设置</h1>
                </el-text>
                <GeneralSetting style="width: 50vh; margin: 0 auto;margin-left: 25%;" />
            </div>
        </el-main>
    </el-container>
</template>
  
<style scoped>
.aside {
    padding-top: 15px;
    padding-bottom: 20px;
    padding-left: 5%;
    width: 13%;
    display: flex;
    justify-content: flex-end;
}

.el-menu {

    left: 10%;
    width: 90%;
    /* 调整这个值以改变宽度 */
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    background-color: #fffffa;
    box-shadow: -1px 0px 4px rgba(0, 0, 0, 0.1);
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