import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Home from '@/pages/Home'
import Users from '@/pages/Users'
import NotFound from '@/pages/404'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})