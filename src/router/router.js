import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import EmployeePage from '../pages/EmployeePage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/employee/:employeeId',
        name: 'EmployeePage',
        component: EmployeePage,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundPage',
        component: NotFoundPage,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
