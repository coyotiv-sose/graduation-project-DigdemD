import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({ user: null }),

  actions: {
    async login(email, password) {
      const loginUser = (await axios.post('/authentication/session', { email, password })).data
      this.user = loginUser
      return loginUser
    }
  }
})
