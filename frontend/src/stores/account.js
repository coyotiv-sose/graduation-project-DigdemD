import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useAccountStore = defineStore('account', {
  state: () => ({}),

  actions: {
    async fetchAccounts() {
      const accounts = (await axios.get('/accounts/all')).data

      return accounts
    },
    async addAccount( currency) {
      const newAccount = (await axios.post('/accounts', {currency: currency})).data
      return newAccount
    },
     async updateAccount(accountId, newValues) {
      const updatedAccount = (await axios.put(`/accounts/${accountId}`, {newValues})).data
      return updatedAccount
    }
  }
})
