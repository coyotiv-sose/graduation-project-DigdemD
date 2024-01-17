<script>
import { useTradeStore } from '@/stores/trade'
import { mapActions } from 'pinia'
import axios from 'axios'

export default {
  name: 'TradesView',
  components: {},
  data() {
    return {
      trades: []
    }
  },
  methods: {
    ...mapActions(useTradeStore, ['fetchTrades'])
  },
  async mounted() {
    this.trades = await this.fetchTrades()
  }
}
//}
</script>
<template>
  <main>
    <h1>Trades</h1>
    <ul>
      <li v-for="trade in trades" :key="trade._id">
        <p>{{ trade.currencyPair }}</p>
      </li>
    </ul>
  </main>
</template>
