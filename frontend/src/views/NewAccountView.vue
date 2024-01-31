<script>
import { useAccountStore } from '@/stores/account'
import { mapActions  } from 'pinia'


export default {
  name: 'NewAccountView',
  data() {
    return {
      selectedCurrency: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['addAccount']),

    async doAddAccount() {
      console.log('selected currecy from newAccountView', this.selectedCurrency)
      await this.addAccount(this.selectedCurrency)
      this.$router.push('/accounts')
    }
}
}


</script>
<template>
  <main>
    <h1>Would you like to open a new account?</h1>
    <div>Selected: {{ selectedCurrency }}</div>

<select v-model="selectedCurrency">
  <option disabled value="">Please select a Currency</option>
  <option>EUR</option>
  <option>USD</option>
  <option>JPY</option>

</select>
<button @click='doAddAccount' type="submit">Create </button>
  </main>
</template>
<style></style>
