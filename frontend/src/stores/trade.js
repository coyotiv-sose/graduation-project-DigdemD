import { defineStore } from 'pinia'
import axios from 'axios'

export const useTradeStore = defineStore('trade', {
  state: () => ({}),

  actions: {
    async fetchTrades() {
      const trades = (await axios.get(import.meta.env.VITE_BACKEND_URL + '/trades')).data

      return trades
    }
  }
})
