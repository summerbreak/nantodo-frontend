<template>
  <div class="search">
    <el-input
        v-model="inputText"
        size="large"
        placeholder="课程搜索"
        :suffix-icon="Search"
        style="width: 100%"
        @change="$emit('search',inputText)"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Search} from '@element-plus/icons-vue'

const inputText = ref('')
const querySearch = () => {
  console.log(inputText)
}


onMounted(() => {
})
</script>

<style>
.search {
  text-align: right;
  width: 100%;
}
</style>
