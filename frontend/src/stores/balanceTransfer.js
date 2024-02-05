import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useBalanceTransferStore = defineStore('balanceTransfer', {
  state: () => ({}),

  actions: {
    async executeTransfer(senderAccountId,receiverAccountId, amount){
      const externalTransfer = (await axios.post(`/accounts/transfers`, {senderAccountId: senderAccountId, receiverAccountId: receiverAccountId, amount: amount } )).data
      return externalTransfer
    }
  }
})
