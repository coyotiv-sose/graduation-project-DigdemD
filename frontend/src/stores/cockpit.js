import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const cockpitStore = defineStore('cockpit', {
  state: () => ({
    eurusd: 0,
    gbpusd: 0
  }),

  actions: {
    connect() {
      const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true })
      socket.on('eurusd', (eurusd) => {
        this.eurusd = eurusd
      })
      socket.on('gbpusd', (gbpusd) => {
        this.gbpusd = gbpusd
      })
    }
  }
})
