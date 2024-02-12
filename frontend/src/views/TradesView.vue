<script>
import { useTradeStore } from '@/stores/trade'
import { mapActions } from 'pinia'
import axios from 'axios'

export default {
  name: 'TradesView',
  components: {},
  data() {
    return {
      trades: [],
      sortKey: null // variable for soting key, could be valueDate, buySellFlag vs
    }
  },
  methods: {
    ...mapActions(useTradeStore, ['fetchTrades']),
    sortBy(key) {
      this.sortKey = key
      this.trades.sort((a, b) => {
        // If key(valueDate) of a trade groser than key(valueDate) of b trade => a first
        return a[key] > b[key] ? 1 : -1
      })
    }
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
          <th @click="sortBy('tradeTime')">Trade ID</th>
          <th @click="sortBy('amount')">Amount</th>
          <th @click="sortBy('buySellFlag')">Buy Sell Flag</th>
          <th @click="sortBy('currencyPair')">Currency Pair</th>
          <th @click="sortBy('executionRate')">Execution Rate</th>
          <th @click="sortBy('buyAccount')">Buy Account Id</th>
          <th @click="sortBy('sellAccount')">Sell Account Id</th>
          <th @click="sortBy('valueDate')">Value Date</th>
          <th @click="sortBy('createdAt')">Trade Time</th>
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
  cursor: pointer; /* Tıklanabilir bir simge gösterecek */
}

th {
  background-color: #f2f2f2;
}
</style>
