<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSearchbarStore } from '../store/SearchbarStore'

//доступ к состоянию поисковой строки:
const searchbarStore = useSearchbarStore()
const {getIsEmpty} = storeToRefs(searchbarStore)

const route = useRoute()
const router = useRouter()
const employeeId = computed(() => route.params.employeeId) // <== получаем доступ к URL параметру employeeId чтобы запросить информацию о сотруднике с API 

const employeeData = ref(null) // <== здесь храним данные о сотруднике
const isLoading = ref(true)    // <== данные для прелоадера
const errorMessage = ref(null) // <== данные об ошибке при запросе

// при очистке поискового запроса делаем редирект на главную страницу:
watch(getIsEmpty, (newValue) => {
    if (newValue) {
        router.push('/')
    }
})

// получаем данные о сотруднике:
const fetchEmployeeData = async () => {
    try {
        isLoading.value = true 
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${employeeId.value}`)

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные сотрудника')
        }

        const data = await response.json() 
        employeeData.value = data[0] 

    } catch (error) {
        errorMessage.value = error.message 
    } finally {
        isLoading.value = false 
    }
}
// новые данные нужны как для отобрадения информации при первоначальной отрисовки компонента, так и при обновлении employeeId:
onMounted(fetchEmployeeData) 
watch(employeeId, fetchEmployeeData)
</script>

<template>
    <div class="wrapper"  v-if="employeeData && !isLoading">
        <img src="/usr-img.png" alt="employee photo" class="image">
        <div class="info">
            <div class="contacts" >
                <h3 class="title">{{ employeeData.name }}</h3>
                <p class="text"><span class="accent">email: </span>{{ employeeData.email }}</p>
                <p class="text"><span class="accent">phone: </span>{{ employeeData.phone }}</p>
            </div>

            <div class="about">
                <h3 class="title">О себе:</h3>
                <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>

    </div>
    <div v-else-if="isLoading" class="notification">Загрузка...</div>
    <div v-else-if="errorMessage" class="notification">{{ errorMessage }}</div>
    <div v-else-if="!employeeData?.name" class="notification">Сотрудника с таким id в базе не существует!</div>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as v;
.notification {
    margin: 0 auto;
    font-size: 14px;
    font-weight: 400;
    color: v.$color-text-light;
    margin-top: 10px;
    align-self: center;
}
.wrapper {
    padding: 30px 30px 30px 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .image {
        width: 424px;
        height: 286px;
        object-fit: contain;
        border: v.$border;
        margin-right: 60px;
        background-color: #fff;
    }

    .info {
        flex: 1;
        min-width: 0;

        .text {
                font-size: 14px;
                font-weight: 400;
                color: v.$color-text-light;
                margin-top: 10px;
        }

        .title {
            color: v.$color-text-dark;
        }

        .contacts {
                .accent {
                    font-size: 16px;
                    font-weight: 600;
                    color: v.$color-text-dark;
                }
        }

        .about {
            .title {
                margin: 20px 0 25px;
                color: v.$color-text-dark;
            }
        }
    }
}
</style>
