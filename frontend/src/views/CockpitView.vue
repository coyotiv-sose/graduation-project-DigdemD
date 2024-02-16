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
      selected: '',
      amount: 1000,
      valueDate: new Date().toISOString().split('T')[0],
      loading: false,
      hiddenPairs: []
      // selectedCurrencyPairs: this.user.currencyPairs
    }
  },
  mounted() {
    this.loading = true
    this.connect()
    this.loading = false
  },
  computed: {
    ...mapState(cockpitStore, ['currencyPairs']),
    ...mapState(useAuthenticationStore, ['user']),
    selectedCurrencyPairs() {
      const newArray = this.currencyPairs.filter(
        (pair) =>
          this.user.currencyPairs.includes(pair.name) && !this.hiddenPairs.includes(pair.name)
      )
      return newArray.map((pair) => ({ ...pair, show: true }))
    }
  },
  methods: {
    ...mapActions(cockpitStore, ['connect', 'executeTrade']),

    getAccount(pairName, buySellFlag) {
      const buyCurrency =
        buySellFlag === 'buy'
          ? pairName.slice(0, 3).toUpperCase()
          : pairName.slice(4, 7).toUpperCase()
      const sellCurrency =
        buySellFlag === 'sell'
          ? pairName.slice(0, 3).toUpperCase()
          : pairName.slice(4, 7).toUpperCase()

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
      this.hiddenPairs.push(pair.name)
    },
    addCurrencyPair(pair) {
      const index = this.hiddenPairs.indexOf(pair)
      if (index !== -1) {
        this.hiddenPairs.splice(index, 1)
      }
    }
  }
}
</script>
<template>
  <div v-if="loading">Loading</div>
  <!-- <Header>Header</Header> -->
  <!-- Welcome on Board <this class="user">{{ user.name }}</this> -->
  <div v-if="!loading">
    <h1>Trading Cockpit</h1>
    <select v-model="selected">
      <option disabled value="">Available Currency Pair</option>
      <option v-for="pair in user.currencyPairs">
        {{ pair }}
      </option>
    </select>
    <button @click="addCurrencyPair(selected)">Add(+)</button>
    <br />
    <div
      class="trade-box"
      v-for="pair in selectedCurrencyPairs"
      :key="pair.name"
      v-show="pair.show"
    >
      <p>{{ pair.name.toUpperCase() }}</p>
      <input v-model="amount" type="number" placeholder="Amount" />
      <input v-model="valueDate" type="date" />
      <br />
      <button @click="doExecuteTrade(pair, 'buy', pair.buyRate)">Buy: {{ pair.buyRate }}</button>
      <button @click="doExecuteTrade(pair, 'sell', pair.sellRate)">
        Sell: {{ pair.sellRate }}
      </button>
      <span @click="removeCurrencyPair(pair)" class="close-icon">&#10006;</span>
    </div>

    <br />
  </div>
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
