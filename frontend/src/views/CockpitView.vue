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
  <br />
  <label>EUR/USD: {{ eurusd }}</label>
  <br />
  <label>GBP/USD: {{ gbpusd }}</label>
  <button>{{ gbpusd }}</button>
</template>
<style></style>
