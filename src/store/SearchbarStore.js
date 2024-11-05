import { defineStore } from 'pinia'

//состояние для хранения информации о поисковой строке приложения. Состояние вынесено в глобальное потому, что по условиям задания от него зависят также другие компоненты:
//а именно страница с информацией о сотруднике и список найденных сотрудников

export const useSearchbarStore = defineStore('searchbar', {
    state: () => ({
        value: ''
    }),
    getters: {
        //
        getNames: (state) => {
            if (state.value !== '') {
                const nameList = state.value.split(',').map(name => name.trim().toLowerCase()) // <== убираем пробелы, приводим в нижний регистр и помещаем значения в массив
                return nameList
            } else {
                return []
            }
        },
        getIsEmpty: (state) => state.value === ''
    },
    actions: {
        setSearchValue(newValue) {
            this.value = newValue
        }
    }
})
