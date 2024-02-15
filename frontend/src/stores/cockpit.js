import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { io } from 'socket.io-client'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const cockpitStore = defineStore('cockpit', {
  state: () => ({
    currencyPairs: [
      { name: 'EUR/USD', buyRate: 1.2, sellRate: 1.1 },
      { name: 'GBP/USD', buyRate: 1.5, sellRate: 1.4 },
      { name: 'EUR/TRY', buyRate: 1.3, sellRate: 1.2 },
      { name: 'EUR/JPY', buyRate: 1.2, sellRate: 1.1 },
      { name: 'GBP/CAD', buyRate: 1.0, sellRate: 0.9 }
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
      socket.on('eurusdsell', (eurusdsell) => {
        this.currencyPairs[0].sellRate = eurusdsell
      })
      socket.on('gbpusd', (gbpusd) => {
        this.currencyPairs[1].buyRate = gbpusd
      })
      socket.on('gbpusdsell', (gbpusdsell) => {
        this.currencyPairs[1].sellRate = gbpusdsell
      })
      socket.on('eurtry', (eurtry) => {
        this.currencyPairs[2].buyRate = eurtry
      })
      socket.on('eurtrysell', (eurtrysell) => {
        this.currencyPairs[2].sellRate = eurtrysell
      })
      socket.on('eurjpy', (eurjpy) => {
        this.currencyPairs[3].buyRate = eurjpy
      })
      socket.on('eurjpysell', (eurjpysell) => {
        this.currencyPairs[3].sellRate = eurjpysell
      })
      socket.on('gbpcad', (gbpcad) => {
        this.currencyPairs[4].buyRate = gbpcad
      })
      socket.on('gbpcadsell', (gbpcadsell) => {
        this.currencyPairs[4].sellRate = gbpcadsell
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
