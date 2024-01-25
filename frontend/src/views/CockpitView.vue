<script>
import Header from './Header.vue'
import { cockpitStore } from '@/stores/cockpit'
import { mapState, mapActions } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'

export default {
  name: 'Cockpit',
  components: {
    Header
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
    // get account(pair){

    // }

    async doExecuteTrade(pair, buySellFlag, executionRate) {
      buySellFlag === 'buy' ? (pair.rate = pair.buyRate) : (pair.rate = pair.sellRate)
      await this.executeTrade(
        '65a97a0b52e47144d7612f06',
        pair.name,
        buySellFlag,
        pair.rate,
        this.amount,
        this.valueDate,
        '65a97a0b52e47144d7612f2d', //b
        '65a97a0b52e47144d7612f11'
      )
    }
  }
}
</script>
<template>
  <Header>Header</Header>
  <!-- Welcome on Board <this class="user">{{ user.name }}</this> -->

  <div class="trade-box" v-for="pair in this.currencyPairs" :key="pair.name">
    <p>{{ pair.name.toUpperCase() }}</p>
    <input v-model="amount" type="number" placeholder="Amount" />
    <input v-model="valueDate" type="date" />
    <br />
    <button @click="doExecuteTrade(pair, 'buy', pair.buyRate)">Buy: {{ pair.buyRate }}</button>
    <button @click="doExecuteTrade(pair, 'sell', pair.sellRate)">Sell: {{ pair.sellRate }}</button>
  </div>

  <br />
</template>
<style scoped>
.trade-box {
  border: 1px solid black;
  width: 210px;
  height: 110px;
  /* padding: 10px; */
  background-color: darkgray;
}
</style>
