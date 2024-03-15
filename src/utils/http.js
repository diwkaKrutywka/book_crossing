import axios from 'axios'
import { useAppStore } from '@/store'
const store = useAppStore()
import router from '@/router'
import { notification } from 'ant-design-vue'
import config from '@/config/index.js'
import i18n from '@/locales/index'
const baseURL = config.baseURL + ''
const Service = axios.create({
  timeout: 10000 * 3,
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 防抖
const debounceTokenCancel = new Map()

Service.interceptors.request.use(
  (config) => {
    store.isLoading = true
    const accessToken = store.userInfo.token || null
    // console.log(accessToken)
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    config.headers['Request-Type'] = 'admin'

    let currentLang = i18n.global.locale.value || 'kz'
    switch (currentLang) {
      case 'kz':
        currentLang = 'kk'
        break
      case 'rus':
        currentLang = 'ru'
        break
      case 'en':
        currentLang = 'en'
        break
    }
    config.headers.lang = currentLang

    // start 防抖 <----
    const tokenKey = `${config.method}-${config.url}`
    const cancel = debounceTokenCancel.get(tokenKey)
    const allowRepeat = config.url.indexOf('download_file_base64') == -1
    if (cancel && allowRepeat) {
      cancel()
    }
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(config)
      }, 500)
      debounceTokenCancel.set(tokenKey, () => {
        clearTimeout(timer)
        resolve(new Error('Q_msg: Бұл сұраудан бас тартылды / 防抖'))
      })
    })
    // --->
    // return config
  },
  async (error) => {
    store.isLoading = false
    return Promise.reject(error)
  }
)
Service.interceptors.response.use(
  async (res) => {
    store.isLoading = false
    if (res.config.responseType === 'blob' && res.request.response.type === 'application/json') {
      return {
        result_code: -1,
        blob: res.data
      }
    }
    if (toString.call(res.data) === '[object Blob]') {
      const { data, headers } = res
      let fileName
      if (headers['content-disposition']) {
        fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
      } else {
        fileName = data.fileName
      }
      return {
        result_code: 0,
        fileName,
        blob: data
      }
    }
    if (res.data.result_code != 0) {
      toastMessage(res.data.result_msg, 'warning', res.data.data)
    }
    console.log()
    return res.data
  },
  async (error) => {
    store.isLoading = false
    if (!error || !error.response) {
      return false
      // return Promise.reject(error)
    }
    const accessToken = store.userInfo.token || null
    const refreshToken = store.userInfo.refresh_token || null
    console.log('------- error ---------')
    console.log('err code : ' + error.response.status)

    if (error.response.status == 401 && store.isLoading == false) {
      store.isLoading = true
      try {
        const res = await axios({
          url: baseURL + 'admin/auth/token/refresh',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + accessToken
          },
          method: 'POST',
          data: {
            refresh_token: refreshToken
          }
        })
        if (res.status == 200 && res.data && res.data.code == 0) {
          console.log(res.data.data)
          store.updateUserInfo(res.data.data)
          store.isLoading = false
          return Service(error.config)
        } else {
          store.isLoading = false
          store.userInfo = {}

          router.push({
            name: 'LoginView'
          })
        }
      } catch (e) {
        store.isLoading = false
        store.userInfo = {}
        router.push({
          name: 'LoginView'
        })
      }
    }
    if (error.response.result_msg) {
      toastMessage(error.response.result_msg, 'error', error.response.data)
    }
    return Promise.reject(error)
  }
)

function toastMessage(msg, type, data) {
  let message = i18n.global.t('l_Error')

  if (msg !== null) {
    message = i18n.global.t(msg)
  }

  if (msg && msg.indexOf('l_') == 0 && msg.indexOf('Success') == -1) {
    if (message.indexOf('l_') == 0) {
      const reg = /[A-Z]+/
      message = msg.replace('l_', '')
      const arr = message.split('')
      arr.forEach((item, index) => {
        if (index > 0 && reg.test(item)) {
          arr[index] = ' ' + item.toLowerCase()
        }
      })
      message = arr.join('')
    }
    if (typeof data === 'string') {
      message = message + ' (' + data + ')'
    }
    notification[type || 'warning']({
      message: message
      // description: data || '',
    })``
  } else if (message) {
    notification[type || 'warning']({
      message: message
      // description: data || '',
    })
  }
}
export default Service
