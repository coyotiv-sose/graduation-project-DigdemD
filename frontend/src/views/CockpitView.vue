<script>
// import Header from './Header.vue'
import { cockpitStore } from '@/stores/cockpit'
import { mapState, mapActions } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'

export default {
  name: 'Cockpit',
  components: {
    // Header
  },
  data() {
    //return is used  for default value
    return {
      amount: 1000,
      valueDate: new Date().toISOString().split('T')[0]
    }
  },
  mounted() {
    this.connect()
  },
  computed: {
    ...mapState(cockpitStore, ['currencyPairs']),
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(cockpitStore, ['connect', 'executeTrade']),

    getAccount(pairName, buySellFlag) {
      const buyCurrency =
        buySellFlag === 'buy'
          ? pairName.slice(0, 3).toUpperCase()
          : pairName.slice(3, 6).toUpperCase()
      const sellCurrency =
        buySellFlag === 'sell'
          ? pairName.slice(0, 3).toUpperCase()
          : pairName.slice(3, 6).toUpperCase()

      const buyAccount = this.user.accounts.find(
        (account) => account.currency == buyCurrency && account.isDefault === true
      )

      const sellAccount = this.user.accounts.find(
        (account) => account.currency == sellCurrency && account.isDefault === true
      )

      return { buyAccount, sellAccount }
    },

    async doExecuteTrade(pair, buySellFlag, executionRate) {
      const accounts = this.getAccount(pair.name, buySellFlag)

      buySellFlag === 'buy' ? (pair.rate = pair.buyRate) : (pair.rate = pair.sellRate)
      await this.executeTrade(
        this.user._id,
        pair.name,
        buySellFlag,
        pair.rate,
        this.amount,
        this.valueDate,
        accounts.buyAccount._id,
        accounts.sellAccount._id
      )
      this.$router.push('/tradeHistory')
    },
    removeCurrencyPair(pair) {
      const index = this.currencyPairs.findIndex((p) => p === pair)
      if (index !== -1) {
        this.currencyPairs.splice(index, 1)
      }
    }
  }
}
</script>
<template>
  <!-- <Header>Header</Header> -->
  <!-- Welcome on Board <this class="user">{{ user.name }}</this> -->
  <h1>Trading Cockpit</h1>

  <div class="trade-box" v-for="pair in this.currencyPairs" :key="pair.name">
    <p>{{ pair.name.toUpperCase() }}</p>
    <input v-model="amount" type="number" placeholder="Amount" />
    <input v-model="valueDate" type="date" />
    <br />
    <button @click="doExecuteTrade(pair, 'buy', pair.buyRate)">Buy: {{ pair.buyRate }}</button>
    <button @click="doExecuteTrade(pair, 'sell', pair.sellRate)">Sell: {{ pair.sellRate }}</button>
    <span @click="removeCurrencyPair(pair)" class="close-icon">&#10006;</span>
  </div>

  <br />
</template>
<style scoped>
.trade-box {
  border: 1px solid black;
  width: 20vw;
  height: 20vh;
  padding: 10px;
  display: inline-block;
  margin: 10px;
  background-color: darkgray;
  position: relative;
}
.close-icon {
  position: absolute; /* to move it at top right */
  top: 0; /* px */
  right: 3px; /* px */
  cursor: pointer; /* for cursor */
}
</style>
