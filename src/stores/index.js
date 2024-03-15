import { defineStore } from 'pinia'
let localeUinfo = localStorage.getItem('userInfo') || null
if (localeUinfo) {
  localeUinfo = JSON.parse(localeUinfo)
}
export const useAppStore = defineStore('app', {
  state: () => ({
    userInfo: localeUinfo || {},
    isLoading: false,
    isBigWin: true
  }),
  getters: {
    hasLogin: (state) => {
      return Boolean(Object.keys(state.userInfo).length > 1)
    }
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = { ...info }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    updateUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    signOut() {
      this.userInfo = {}
      localStorage.removeItem('userInfo')
    }
  }
})
