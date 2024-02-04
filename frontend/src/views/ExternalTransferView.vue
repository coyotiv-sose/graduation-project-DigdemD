<script>
import { mapState } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'

export default{
  name:'ExternalTransferView',
  components: {},
  data(){
    return {
      selectedAccount:''
    }
  },
  mounted(){},
  computed:{
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods:{}

}
</script>
<template>
  <main>
    <h1>External Balance Transfer</h1>
    <div> Sender Account: {{selectedAccount}}
      <select v-model="selectedAccount">
      <option v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }}</option>
      </select>
    </div>
    <div style="display: flex; align-items: center;">
      <p style="margin-right: 10px;">Receiver BIC: {{ BIC }}</p>
      <input v-model="BIC" placeholder="pls insert receiverBIC Code">
    </div>
    <div style="display: flex; align-items: center;">
      <p style="margin-right: 10px;">Receiver IBAN: {{ IBAN }}</p>
      <input v-model="IBAN" placeholder="pls insert IBAN">
    </div>
    <div style="display: flex; align-items: center;">
      <p style="margin-right: 10px;">Receiver institution: {{ INSTITUTION }}</p>
      <input v-model="INSTITUTION" placeholder="pls insert receiver institution ">
    </div>
    <div style="display: flex; align-items: center;">
      <p style="margin-right: 10px;">Receiver name: {{ NAME }}</p>
      <input v-model="NAME" placeholder="pls insert receiver name ">
    </div>
    <div style="display: flex; align-items: center;">
      <p style="margin-right: 10px;">Receiver institution: {{ AMOUNT }}</p>
      <input v-model="AMOUNT" placeholder="pls insert amount ">
    </div>
  </main>
</template>
<style></style>
