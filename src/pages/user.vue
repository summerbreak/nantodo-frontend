
<template>
    <el-container style="display: flex; align-items: center; height: 100%">
        <div class="aside">
            <el-menu default-active="1" class="el-menu-vertical-demo" active-text-color="orange" style="height: 85vh; display: flex; flex-direction: column; justify-content: center; border-radius: 20px;     background-color: #fffffa;
" @select="menuSelect">
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


        <el-main style="display: fl0ex; justify-content: center; align-items: center">
            <div v-show="index == 1"
                style="width: 90%;height:100%;background-color: #fffffa;display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 20px;">

                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px">
                    <h1>个人信息</h1>
                </el-text>
                <UserInfoComponent style="width: 50vh; margin: 0 auto" />

            </div>


            <div v-show="index == 2"
                style="width: 90%;height:100%;background-color: #fffffa;display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 20px;">

                <el-text type="warning" style="display: flex;justify-content: center ;font-size:15px">
                    <h1>通用设置</h1>
                </el-text>
                <GeneralSetting />
            </div>
        </el-main>
    </el-container>
</template>
  
<style scoped>
.aside {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5%;
    width: 15%;

}
</style>

<script setup>
import { ref } from 'vue';
import GeneralSetting from '../components/GeneralSetting.vue';
import UserInfoComponent from '../components/UserInfoComponent.vue';

const index = ref(1)

const menuSelect = (key) => {
    index.value = key
    console.log(key);
}
</script>