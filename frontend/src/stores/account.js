import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountStore = defineStore('account', {
  state: () => ({}),

  actions: {
    async fetchAccounts() {
      const accounts = (await axios.get('http://localhost:3000/accounts')).data

      return accounts
    }
  }
})
