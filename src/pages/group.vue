<template>
    <div class="container">
        <div class="aside">
            <div></div>
            <div></div>
        </div>
        <div class="group-main"></div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.container {
    height: 100%;
    width: 1000px;
    background-color: #555;
    margin: auto;
    display: flex;
    flex-direction: row;
}
.aside {
    background-color: #aaa;
    height: 100%;
    width: 200px;
}

.group-main {
    background-color: #bbb;
    height: 100%;
    width: 800px;
}
</style>