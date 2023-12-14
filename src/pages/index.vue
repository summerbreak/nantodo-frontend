<template>
    <Welcome v-if="!isLogin" />
    <Todo v-else/>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.js'

const isLogin = computed(() => useUserStore().isLogin)

</script>