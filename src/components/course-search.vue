<template>
  <div class="search">
    <el-input
        v-model="inputText"
        size="large"
        placeholder="课程搜索"
        :suffix-icon="Search"
        style="width: 50%"
        @change="querySearch"
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

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
