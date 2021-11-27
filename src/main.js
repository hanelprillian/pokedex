import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'

window.axios = require('axios').default

import App from './App.vue'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Detail from './pages/Detail'

const routes = [
    { path: '/', component: Home },
    { path: '/favorite', component: Favorite },
    { path: '/pokemon/:id', component: Detail },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
