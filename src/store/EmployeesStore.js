import { defineStore } from 'pinia'
import { useSearchbarStore } from './SearchbarStore'
import localforage from 'localforage'

//состояние для хранения инфомрации о сотрудниках

export const useEmployeesStore = defineStore('employees', {
    state: () => ({
        //список всех сотрудников из API:
        employees: [],
        //список отфильтрованных по id или name:
        filteredEmployees: [],
        //если совпадения по name или id нет
        noResults: false,
        //время последнего обновления данных из API
        lastUpdated: null
    }),
    getters: {
        getFilteredEmployees: (state) => state.filteredEmployees
    },
    actions: {
        //инициализация состояния приложения. Данные кэшируются в localforage и сохраняются в течение 30 минут, после запрашиваются с API:
        async initEmployeesData() {
            try {
                const cachedData = await localforage.getItem('employees')
                const lastUpdated = await localforage.getItem('lastUpdated')
                const currentTime = Date.now()

                if (cachedData && lastUpdated && (currentTime - lastUpdated < 1800000)) {
                    this.employees = cachedData
                } else {
                    await this.fetchEmployees()
                }
            } catch (error) {
                console.error('Ошибка загрузки данных из localforage:', error)
            }
        },
        async fetchEmployees() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users') // <= из API получаю список всех существующих сотрудников
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                this.employees = data
                await localforage.setItem('employees', data)

                const now = Date.now()
                this.lastUpdated = now
                await localforage.setItem('lastUpdated', now)

            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            }
        },
        //логика фильтрации сотрудников по поисковому запросу из числа уже сохраненных в локальную БД (localforage):
        setFilteredEmployees(maxResults = 5) {  // <== предполагаю, что возможно максимум 5 сотрудников с одинаковыми именами и фамилиями и ограничиваю отображаемый список сотрудников
            const searchbarStore = useSearchbarStore() // <== доступ к состоянию поискового поля
            const searchQuery = searchbarStore.getNames
            //чтобы обеспечить поиск и по name и по id - сепарирую эти значения из поискового поля:
            const separateNamesAndIds = (arr) => {
                const names = []
                const ids = []
                arr.forEach(item => {
                    if (!isNaN(item)) {
                        ids.push(Number(item))
                    } else {
                        names.push(item)
                    }
                })
                return { names, ids }
            }
            //прохожусь по кэшу сотрудников и нахожу нужные id и name:
            const filterEmployees = (names, ids, emplData, maxResults) => {
                let matchesName = []
                let matchesIds = []
                if (names.length > 0) {
                    matchesName = emplData
                        .filter(empl => names.some(name => empl.name.toLowerCase().includes(name)))
                        .slice(0, maxResults)
                }
                if (ids.length > 0) {
                    matchesIds = emplData
                        .filter(empl => ids.some(id => Number(empl.id) === id))
                        .slice(0, maxResults)
                }
                const result = new Set([...matchesName, ...matchesIds]) // <== использую Set чтобы сохранить только уникальные значения
                return Array.from(result)
            }

            const { names, ids } = separateNamesAndIds(searchQuery)
            const filteredResults = filterEmployees(names, ids, this.employees, maxResults)

            this.filteredEmployees = filteredResults // <== коллекцию отфильтрованных сотрудников записываю в состояние
            this.noResults = filteredResults.length === 0
        }
    },
})
