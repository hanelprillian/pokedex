import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'

window.axios = require('axios').default

import App from './App.vue'
import Home from './pages/Home'

const routes = [
    { path: '/', component: Home },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
