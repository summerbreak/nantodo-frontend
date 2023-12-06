import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from '~pages'
import ElementPlus from 'element-plus'
import { setupCalendar} from 'v-calendar'


const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router).use(ElementPlus).use(setupCalendar, {})
app.mount('#app')