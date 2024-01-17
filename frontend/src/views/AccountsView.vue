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
    <table>
      <thead>
        <tr>
          <th>Account ID</th>
          <th>Currency</th>
          <th>Balance</th>
          <th>Status</th>
          <th>Account Name</th>
          <th>Account Opening Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account._id">
          <td>{{ account._id }}</td>
          <td>{{ account.currency }}</td>
          <td>{{ account.balance }}</td>
          <td>{{ account.status }}</td>
          <td>{{ account.name }}</td>
          <td>{{ account.createdAt }}</td>
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
