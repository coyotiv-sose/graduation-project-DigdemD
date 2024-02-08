import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useSettingStore = defineStore('setting', {
  state: () => ({}),

  actions: {
    // async fetchUser() {
    //   const user = (await axios.get('users/user')).data
    //   return user
    // },
    async updateUser(userId, newValues) {
      const user = (await axios.put(`users/${userId}`, { newValues })).data
      return user
    }
  }
})
