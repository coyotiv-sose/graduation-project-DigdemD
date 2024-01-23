import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const useTradeStore = defineStore('trade', {
  state: () => ({}),

  actions: {
    async fetchTrades() {
      const trades = (await axios.get('/trades')).data

      return trades
    }
  }
})
