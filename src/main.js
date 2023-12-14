import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from '~pages'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { setupCalendar} from 'v-calendar'

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router).use(ElementPlus, {locale: zhCn}).use(createPinia()).use(setupCalendar, {})
app.mount('#app')