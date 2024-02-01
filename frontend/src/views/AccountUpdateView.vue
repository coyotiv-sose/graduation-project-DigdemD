<script>
import { useAccountStore } from '@/stores/account'
import { mapActions  } from 'pinia'


export default {
  name: 'AccountUpdateView',
  data() {
    return {
      selectedAccount: ''
    }
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
  <!-- <option>EUR</option>
  <option>USD</option>
  <option>JPY</option> -->

</select>
<button @click='doUpdateAccount' type="submit">Update </button>
  </main>
</template>
<style></style>
