import { defineStore } from 'pinia'
import axios from 'axios'

export const useTradeStore = defineStore('login', {
  state: () => ({}),

  actions: {
    async login() {
      const loginUser = (await axios.get('http://localhost:3000/authentication/session')).data

      return trades
    }
  }
})

//to do: I could not
