<script setup>
</script>

<template>
    <div class="wrapper">
        <div class="placeholder">
            <p class="text">Выберите сотрудника, чтобы посмотреть его профиль</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as v;

.wrapper {
    padding: 30px 20px;
    height: 100%;
    width: 100%;
    
    .placeholder {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
            font-size: 14px;
            color: v.$color-text-light;
        }
    }
}
</style>
