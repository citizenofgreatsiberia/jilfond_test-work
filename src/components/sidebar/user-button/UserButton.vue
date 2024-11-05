<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// компонент кнопки для выбора пользователя из списка найденых.
// получает в пропсе объект Person и отображает имя и емейл сотрудника

const route = useRoute()
const employeeId = computed(() => route.params?.employeeId)

const props = defineProps({
    person: Object,
    required: true,
})

const employeePagePath = `/employee/${props.person.id}`

const buttonStyles = computed(() => {
    return employeeId.value === props.person.id.toString() ? "wrapper active" : "wrapper"
})

const cutString = (string, maxLength = 18) => {
    if (string && string.length > maxLength) {
        return string.substring(0, maxLength - 3) + "..." // <== при использовании размера шрифта из макета не все адреса почт помещаются в кнопке. Для эстетичности сократил количество отображаемых символов
    }
    return string || ""
}
</script>

<template>
     <router-link :to="employeePagePath">
        <div :class="buttonStyles">
        <img src="/usr-img.png" alt="user photo" class="image">
        <div class="info">
            <h4 class="name">{{ person.name }}</h4>
            <p class="mail">{{cutString(person.email)}}</p>
        </div>
    </div>
     </router-link>
   
</template>

<style lang="scss" scoped>
@use '../../../variables.scss' as v;
    .wrapper {
        display: flex;
        width: 240px;
        border-radius: v.$border-radius; 
        box-shadow: v.$box-shadow;
        margin-bottom: 18px;
        display: flex;
        &.active {
                background-color: v.$color-back-grey;
            }
        cursor: pointer;
        .image {
            width: 70px;
            object-fit: contain;
            border-right: v.$border;
            background-color: #fff;
        }
        .info {
            padding: 15px;
            font-size: 14px;
            overflow: hidden;

            .name {
                font-weight: 600;
                color: v.$color-text-dark;
            }
            .mail {
                color: v.$color-text-light;
                font-weight: 400;
            }
        }
    }
</style>
