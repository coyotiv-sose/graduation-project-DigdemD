<script>
import { useAccountStore } from '@/stores/account'
import { mapStores, mapActions, mapState  } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'

export default {
  name: 'AccountUpdateView',
  data() {
    return {
      selectedAccount: ''
    }
  },
  computed: {

    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['updateAccount']),

    async doUpdateAccount( ) {
      await this.updateAccount( )
    },
}
}


</script>
<template>
  <main>
    <h1>Would you like to update an account?</h1>

    <div>Selected: {{ selectedAccount }}</div>
      <select v-model="selectedAccount">
        <option disabled value="">Please select an Account</option>
        <option v-for="account in user.accounts" :key="account._id" >{{account._id}}</option>
      </select>
      <button @click='doUpdateAccount' type="submit">Update </button>
  </main>
</template>
<style></style>
