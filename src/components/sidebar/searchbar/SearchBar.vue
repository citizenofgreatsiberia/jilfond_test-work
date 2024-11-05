<script setup>
import { ref, watch } from 'vue'
import { useSearchbarStore } from '../../../store/SearchbarStore'
import { useEmployeesStore } from '../../../store/EmployeesStore'

//компонент поискового поля

const searchbarStore = useSearchbarStore()
const {setSearchValue} = searchbarStore

const employeesStore = useEmployeesStore() //<== доступ к хранилищу информации о сотрудниках

const inputValue = ref('')

const startSearch = () => {
    employeesStore.setFilteredEmployees()
}

watch(inputValue, (newValue) => {
    setSearchValue(newValue)
    if (inputValue.value.length === 0) {
        employeesStore.setFilteredEmployees() // <== очищаем список сотрудников если поле поиска пустое
    }
})

</script>

<template>
    <h3 class="title">Поиск сотрудников</h3>
    <input v-model="inputValue" @keyup.enter="startSearch" class="input" type="search" placeholder="Введите id или имя"/>
</template>

<style lang="scss" scoped>
@use '../../../variables.scss' as v;
.input {
    margin-bottom: 22px;
    width: 240px;
    height: 46px;
    border: 1.5px solid #E9ECEF;
    border-radius: 8px;
    outline: none;
    padding: 14.5px 16px;
    font-size: 14px;
}

.title {
    margin-bottom: 22px;
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    color: v.$color-text-dark;
}
</style>