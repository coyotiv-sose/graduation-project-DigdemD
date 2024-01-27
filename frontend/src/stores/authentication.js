import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({ user: null }),

  actions: {
    async login(email, password) {
      const loginUser = (await axios.post('/authentication/session', { email, password })).data
      this.user = loginUser
      return loginUser
    },
    async fetchUser() {
      const user = (await axios.get('/authentication/session')).data
      this.user = user
      return user
    },
    async logout() {
      console.log('user want to log out')
      await axios.delete('/authentication/session')
      this.user = null
    }
  }
})
