import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const useAccountStore = defineStore('account', {
  state: () => ({}),

  actions: {
    async fetchAccounts() {
      const accounts = (await axios.get('/accounts')).data

      return accounts
    }
  }
})
