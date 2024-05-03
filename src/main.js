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

app.config.globalProperties.$dateFormat = 'DD/MM/YYYY'
app.config.globalProperties.$timeFormat = timeFormat
app.config.globalProperties.$getFileName = getFileName
app.config.globalProperties.$toTimeStamp = toTimeStamp
app.config.globalProperties.$timeLocaleFormat = timeLocaleFormat
app.config.globalProperties.$getFileUrl = getFileUrl
app.config.globalProperties.$firstUpperCase = firstUpperCase
app.use(router).use(i18n).use(Antd).mount('#app')

function timeFormat(t, hm, s) {
  if (!t) {
    return ''
  }
  if (typeof t != 'number') {
    return t
  }
  if (s) {
    t = t / 1000
  }
  let d = new Date(t * 1000)
  let day = d.getDate()
  let m = d.getMonth() + 1
  let y = d.getFullYear()
  if (day.toString().length == 1) {
    day = '0' + day.toString()
  }
  if (m.toString().length == 1) {
    m = '0' + m.toString()
  }
  let h = d.getHours()
  let mn = d.getMinutes()
  if (h.toString().length < 2) {
    h = '0' + h
  }
  if (mn.toString().length < 2) {
    mn = '0' + mn
  }
  if (hm) {
    return `${day}/${m}/${y} ${h}:${mn}`
  }
  return `${day}.${m}.${y}`
}

function timeLocaleFormat(t) {
  if (!t) {
    return ''
  }
  if (typeof t != 'number') {
    return t
  }
  let d = new Date(t * 1000)
  let day = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Almaty',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(d)

  return day
}
function getFileName(url) {
  if (url && typeof url === 'string') {
    if (url.indexOf('/') == -1) {
      return url
    }
    return url.split('/')[url.split('/').length - 1]
  } else {
    return ''
  }
}

function toTimeStamp(time) {
  let e = time || 0
  if (e) {
    return (dayjs(e).valueOf() / 1000).toFixed(0) * 1
  } else {
    return e
  }
}

function getFileUrl(url) {
  if (url.indexOf('http') == 0) {
    return url
  }
  return config.baseURL + url
}

function firstUpperCase(word) {
  if (!word || typeof word != 'string') {
    return ''
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}
