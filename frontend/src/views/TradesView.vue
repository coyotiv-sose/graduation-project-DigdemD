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
</script>
<template>
  <main>
    <h1>Trade History</h1>
    <table>
      <thead>
        <tr>
          <th>Trade ID</th>
          <th>Amount</th>
          <th>Buy Sell Flag</th>
          <th>Currency Pair</th>
          <th>Execution Rate</th>
          <th>Buy Account Id</th>
          <th>Sell Account Id</th>
          <th>Value Date</th>
          <th>Trade Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trade in trades" :key="trade._id">
          <td>{{ trade._id }}</td>
          <td>{{ trade.amount }}</td>
          <td>{{ trade.buySellFlag }}</td>
          <td>{{ trade.currencyPair }}</td>
          <td>{{ trade.executionRate }}</td>
          <td>{{ trade.buyAccount }}</td>
          <td>{{ trade.sellAccount }}</td>
          <td>{{ trade.valueDate }}</td>
          <td>{{ trade.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
