import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountStore = defineStore('account', {
  state: () => ({}),

  actions: {
    async fetchAccounts() {
      const accounts = (await axios.get(import.meta.env.VITE_BACKEND_URL + '/accounts')).data

      return accounts
    }
  }
})
