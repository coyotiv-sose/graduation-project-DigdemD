<script>
import { useAccountStore } from '@/stores/account'
import { mapStores } from 'pinia'
import axios from 'axios'

export default {
  name: 'AccountsView',
  components: {},
  data() {
    return {
      accounts: []
    }
  },
  computed: {
    ...mapStores(useAccountStore)
  },
  methods: {},
  async mounted() {
    this.accounts = await this.accountStore.fetchAccounts()
  }
}
</script>
<template>
  <main>
    <h1>Accounts</h1>
    <ul>
      <li v-for="account in accounts" :key="account._id">
        <p>{{ account.currency }}</p>
      </li>
    </ul>
  </main>
</template>
