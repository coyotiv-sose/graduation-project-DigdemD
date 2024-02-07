import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useSettingStore = defineStore ('setting', {
  state:() => ({}),

  actions: {
    async fetchUser(){
      const user= (await axios.get('users/user')).data
      return user
    }
  }
})
