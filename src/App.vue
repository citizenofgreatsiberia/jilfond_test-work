<script setup>
import { onMounted } from 'vue'
import { useEmployeesStore } from './store/EmployeesStore'
import AppHeader from './components/app-header/AppHeader.vue'
import AppMain from './components/app-main/AppMain.vue'

const employeesStore = useEmployeesStore()

onMounted(() => {
  employeesStore.initEmployeesData() // <== инициализируем состояние приложения, получаем список пользователей из API и сохраняем его в localforage
})
</script>

<template>
  <div class="wrapper">
    <AppHeader/>
    <AppMain/>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  padding: 50px 50px 58px;
  min-width: 1200px;
}
</style>
