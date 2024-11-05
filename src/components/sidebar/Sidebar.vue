<script setup>
import SearchBar from './searchbar/SearchBar.vue'
import SearchResults from './search-results/SearchResults.vue'

</script>

<template>
    <div class="sidebar">
         <SearchBar/>
         <SearchResults/>
    </div>
</template>

<style lang="scss" scoped>
@use '../../variables.scss' as v;
.sidebar {
    height: 100%;
    background-color: v.$color-back-light;
    width: 291px;
    border-right: v.$border;
    padding: 27px 20px;
}
</style>
