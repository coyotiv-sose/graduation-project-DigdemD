import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { io } from 'socket.io-client'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const cockpitStore = defineStore('cockpit', {
  state: () => ({
    currencyPairs: [
      { name: 'eurusd', buyRate: 1.2, sellRate: 1.1 },
      { name: 'gbpusd', buyRate: 1.5, sellRate: 1.4 }
      // I should add more ccy pairs
    ]
  }),

  actions: {
    connect() {
      const authStore = useAuthenticationStore()
      const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true })
      socket.on('eurusd', (eurusd) => {
        this.currencyPairs[0].buyRate = eurusd
      })
      socket.on('eurusd', (eurusdsell) => {
        this.currencyPairs[0].sellRate = eurusdsell
      })
      socket.on('gbpusd', (gbpusd) => {
        this.currencyPairs[1].buyRate = gbpusd
      })
      socket.on('gbpusd', (gbpusdsell) => {
        this.currencyPairs[1].sellRate = gbpusdsell
      })
    },
    async executeTrade(
      userId,
      currencyPair,
      buySellFlag,
      executionRate,
      amount,
      valueDate,
      buyAccountId,
      sellAccountId
    ) {
      const trade = await axios.post(`/trades/${userId}`, {
        currencyPair,
        buySellFlag,
        executionRate,
        amount,
        valueDate,
        buyAccountId,
        sellAccountId
      }) //from body
      return trade
    }
  }
})
