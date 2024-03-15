import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/index'
import Antd from 'ant-design-vue'
import i18n from './locales/index'
import './assets/style/global.css'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.config.globalProperties.$store = useAppStore()
app.config.globalProperties.$componentSize = 'small'
app.use(router).use(i18n).use(Antd).mount('#app')
