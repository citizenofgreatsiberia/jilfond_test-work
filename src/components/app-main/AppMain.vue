<script setup>
import Sidebar from '../sidebar/Sidebar.vue'
 //отрисовка вложенных маршрутов происходит здесь:
</script>

<template>
    <main class="main">
        <Sidebar />
        <router-view />
    </main>
</template>

<style lang="scss" scoped>
@use '../../variables.scss' as v;
.main {
    height: calc(100% - 30px);
    display: flex;
    box-shadow: v.$box-shadow;
    border-radius: v.$border-radius;
    background-color: v.$color-back-light;
    overflow: hidden;
}
</style>
