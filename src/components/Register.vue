<template>
    <div class="register-box">
        <el-container>
            <div class="t-tab-top">欢迎您注册南土豆账号</div>
            <el-main style="width: 375px;">
                <div class="form">
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">账号：</label>
                        <el-input v-model="phone" placeholder="请输入手机号" height="20px" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">密码：</label>
                        <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;width: 150px;min-width: 100px;font-weight: bold;white-space: nowrap;;text-align: right;">确认密码：</label>
                        <el-input v-model="passwordConfirm" type="password" placeholder="请确认密码" show-password />
                    </div>

                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">姓名：</label>
                        <el-input v-model="name" placeholder="您的姓名" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">学号：</label>
                        <el-input v-model="studentNumber" placeholder="您的学号" />
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 120px;text-align: right;">年级：</label>
                        <el-select v-model="selectedGrade" class="m-2" placeholder="选择您的年级" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="form-group">
                        <label
                            style="margin-right: 10px;font-size: 20px;min-width: 60px;font-weight: bold;width: 150px;text-align: right;">邮箱：</label>
                        <el-input v-model="email" placeholder="您的邮箱" />
                    </div>
                    <div class="form-group" style="display: flex; align-items: center;">
                        <el-checkbox v-model="agree">同意</el-checkbox>
                        <a class="regulation" style="color:#db8916">《南土豆使用条例》</a>
                    </div>
                    <div class="form-group" style="margin-bottom: 22px; display: flex; justify-content: center;">
                        <el-button type="warning" style="width: 75%; height: 42px;font-size: 20px;" @click="Register">注
                            册</el-button>
                    </div>

                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        const phone = ref('')
        const password = ref('')
        const passwordConfirm = ref('')
        const name = ref('')
        const studentNumber = ref('')
        const email = ref('')
        const selectedGrade = ref('');
        const options = ref([
            { label: '大一', value: '大一' },
            { label: '大二', value: '大二' },
            { label: '大三', value: '大三' },
            { label: '大四', value: '大四' },
            // 添加更多年级...
        ]);
        const agree = ref(false);

        var user = {
            phone: phone,
            password: password,
            name: name,
            studentNumber: studentNumber,
            email: email,
            grade: selectedGrade,
        }
        const register = async () => {
            if (password.value != passwordConfirm.value) {
                alert("两次密码不一致");
                return;
            }
            if (!agree) {
                alert("请同意使用条例");
                return;
            }

        }


        return {
            password,
            selectedGrade,
            options,
            agree,
        }
    }
}
</script>
  
<style scoped>
.register-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 100vh;
    padding: 30px;
    background: rgba(242, 234, 222, 0.97);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}


.t-tab-top {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
    text-align: center;
    padding: 25px 0 20px 0;
    border-bottom: 1px solid #db8916;
    margin-bottom: 5px;
}

.form-group {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 12px;
    align-items: center;

}

.regulation:hover {
    cursor: pointer;

}
</style>