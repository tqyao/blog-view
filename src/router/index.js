import {createRouter, createWebHistory} from 'vue-router'

const routes = [

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login'),
    },

    {
        path: '/',
        component: () => import('@/views/Index'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/Home')
            },
            {
                path: '/find',
                name:' find',
                component: ()=> import('@/views/find/Find')
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
