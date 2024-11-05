# Тестовое задание (Vue.js)

___
[Проект](https://citizenofgreatsiberia.github.io/jilfond_test-work/#/) на gh-pages 
___
## Задачи:
### SPA должно быть реализовано с использованием Vue.
Использован Vue 3, Vue Router и Pinia для управления глобальным состоянием.
### Необходимо создать основные компоненты.
созданы компоненты:
* App.vue - основной компонент приложения
* EmployeePage.vue, MainPage.vue, NotFoundPage.vue - страницы приложения.
* Sidebar.vue - боковая панель (включает в себя компоненты: UserButton.vue, SearchBar.vue, SearchResults.vue)
* AppHeader.vue
* AppMain.vue - компонент, в котором отрисовываются вложенные маршруты
* реализован маршрутищатор router.js
* Настроено 2 хранилища: EmployeesStore.js (состояние с информацией о сотрудниках) и SearchbarStore.js (состояние поискового модуля)
### Использовать actions, mutations. 
Документация Vue 3 для управления состоянием рекомендует использовать Pinia. Для управления состоянием приложения созданы экшены:
- initEmployeesData (инициализирует состояние useEmployeesStore закэшированными данными из localforage, либо запускает fetchEmployees и тот в свою очередь подгружает данные из API)
- fetchEmployees (получает данные из API)
- setSearchValue (записывает текущее состояние поискового модуля)
### Стили должны быть написаны с помощью препроцессора Scss
### Использовать изоляцию стилей.
Стили каждого модуля SFC написаны с применением scss и изолированы (атрибут scoped в <style>). Общие цвета и параметры стилей вынесены в отдельный файл с переменными variables.scss.
### Во время всех запросов нужно сигнализировать пользователю через прелоадер, что происходит запрос.
Во время запроса информации о сотруднике во время загрузки отображается прелоадер "загрузка...". При возникновении ошибки пользователь также получает уведомление. При переходе на несуществующую страницу пользователь также получает уведомление.
## Также необходимо было учесть:
Учесть при выполнении ТЗ:
### Можно искать, как одного пользователя, так и нескольких (допустим Bret, 	Antonette).
Реализовано. Поиск возможен как по одному, так и по нескольким именам.
### Поиск должен работать по полю id и полю username либо name, на ваше усмотрение.
Реализовано. Поиск работает как по id, так и по имени пользователя. Id и имена можно комбинировать в одном запросе.
### При выборе способа получения пользователя(пользователей) и фильтрации учитывать, что их может быть больше 2000 человек.
Реализовано кэширование результата запроса к API с коллекцией пользователей. Данные сохраняются в течение 30 минут, затем снова загружаются с сервера. Использована библиотека localforage.
### При изменении состояния в sidebar, страница с профилем пользователя должна менять свое состояние, т.е если открыт профиль пользователя и потом решили удалить все из строки поиска, очищается список найденных пользователей, и страница отображения профиля возвращается в исходное состояние.
Реализовано. При очищении поискового поля очищается список найденных сотрудников, а страница с данными конкретного пользователя "сбрасывается" и происходит переадресация пользователя на "главную" страницу. 
