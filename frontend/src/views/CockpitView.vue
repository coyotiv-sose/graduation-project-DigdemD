<script>
import Header from './Header.vue'
import { cockpitStore } from '@/stores/cockpit'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'Cockpit',
  components: {
    Header
  },
  mounted() {
    this.connect()
  },
  computed: {
    ...mapState(cockpitStore, ['eurusd', 'gbpusd'])
  },
  methods: {
    ...mapActions(cockpitStore, ['connect'])
  }
}
</script>
<template>
  <Header>Header</Header>
  Welcome on Board <this class="user">{{ user }}</this>
  <div class="trade-box">
    <p>EUR/USD</p>
    <button>Buy: {{ eurusd }}</button>
    <button>Sell: {{ eurusd }}</button>
  </div>
  <br />
  <div class="trade-box">
    <p>GBP/USD</p>
    <button>Buy:{{ gbpusd }}</button>
    <button>Sell:{{ gbpusd }}</button>
  </div>
</template>
<style scoped>
.trade-box {
  border: 1px solid black;
  width: 200px;
  height: 100px;
  padding: 16px;
  background-color: darkgray;
}
</style>
