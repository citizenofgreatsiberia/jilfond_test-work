<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useSearchbarStore } from '../../../store/SearchbarStore'
import { useEmployeesStore } from '../../../store/EmployeesStore'
import UserButton from '../user-button/UserButton.vue'

//компонент отображает результаты фильтрации списка сотрдников

const searchbarStore = useSearchbarStore()       //<== доступ к хранилищу состояния поиска
const {getIsEmpty} = storeToRefs(searchbarStore) 

const employeesStore = useEmployeesStore()       //<== доступ к хранилищу информации о пользователях
const {getFilteredEmployees, noResults } = storeToRefs(employeesStore) 

</script>

<template>
    <h3 class="title">Результаты</h3>
    <div v-if="!getIsEmpty && getFilteredEmployees.length > 0" >
        <div v-for="person in getFilteredEmployees" :key="person.id">
            <UserButton :person="person"/>
        </div>
    </div>
    <p v-else-if="noResults" class="text">нет результатов</p>
    <p v-else class="text">начните поиск</p>
  

</template>

<style lang="scss" scoped>
@use '../../../variables.scss' as v;
.title {
    margin-bottom: 22px;
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    color: v.$color-text-dark;
}

.text {
    color: v.$color-text-light;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 22px;
}
</style>
