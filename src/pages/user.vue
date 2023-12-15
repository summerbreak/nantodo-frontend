
<template>
    <el-container style="display: flex; align-items: center;">
        <el-main style="flex-direction:column; display: flex; align-items: center;justify-content:center;">
            <div class="box">
                <el-text class="box-top" type="warning">
                    <h1 style="line-height: 0.8;">个人中心</h1>
                </el-text>
                <!-- <keep-alive>
                    <UserInfoComponent />
                </keep-alive> -->
                <keep-alive>
                    <UserCenter />
                </keep-alive>

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

.box-top {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #db8916;
    margin-bottom: 10px;

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