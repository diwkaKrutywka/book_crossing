import axios from 'axios'
import { useAppStore } from '@/stores'
import router from '@/router'
import config from '@/config/index.js'
// import i18n from '@/locales/index'

const store = useAppStore()
const baseURL = config.baseURL + '/api/v1/'

const Service = axios.create({
  timeout: 10000 * 3,
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

Service.interceptors.request.use(
  async (config) => {
    const token = store.userInfo.access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Service.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = store.userInfo.refresh_token
      if (refreshToken) {
        try {
          const res = await axios({
            url: baseURL + 'auth/refresh_token',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: 'Bearer ' + accessToken
            },
            method: 'POST',
            data: {
              token: refreshToken
            }
          })
          if (res.status == 200 && res.result && res.status_code == 0) {
            let accessToken = res.data.access_token
            let newRefreshToken = res.data.refresh_token
            let userInfo = {
              ...store.userInfo,
              access_token: accessToken,
              refresh_token: newRefreshToken
            }
            store.commit('setUserInfo', userInfo)
            return Service(originalRequest)
          } else {
            store.commit('setUserInfo', {})
            router.push({ name: 'LoginView' })
          }
        } catch (error) {
          console.error('Failed to refresh token:', error)
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default Service
