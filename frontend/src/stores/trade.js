import { defineStore } from 'pinia'
import axios from 'axios'

export const useTradeStore = defineStore('trade', {
  state: () => ({}),

  actions: {
    async fetchTrades() {
      const trades = (await axios.get('http://localhost:3000/trades')).data

      return trades
    }
  }
})
