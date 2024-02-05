<script>
import { mapState, mapActions } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBalanceTransferStore } from '@/stores/balanceTransfer'

export default{
  name:'ExternalTransferView',
  components: {},
  data(){
    return {
      selectedAccount:{},
      BIC: '',
      IBAN: '',
      institution: '',
      name: '',
      amount: ''
    }
  },
  mounted(){},
  computed:{
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods:{
    ...mapActions(useBalanceTransferStore, ['executeTransfer']),

    redirectToAccounts(){
    this.$router.push('/accounts')
  },
  resetPage(){
    this.selectedAccount = ''
      this.BIC = ''
      this.IBAN = ''
      this.institution = ''
      this.name = ''
      this.amount =0
  },
  async doExecuteTransfer(){
    //add fuction parameters and mapActions after store definition
    console.log('///selectedAccountId', this.selectedAccount._id )
    console.log('///amount', this.amount )
      await this.executeTransfer(this.selectedAccount, this.IBAN,this.amount)
      console.log('call execute transfer')
  }

  }
}
</script>
<template>
  <main>
    <h1>External Balance Transfer</h1>
    <div> Sender Account: {{selectedAccount}}
      <select v-model="selectedAccount">
      <option :value='account._id' v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }}</option>
      </select>
    </div>
    <div class="input-group">
      <p class="label">Receiver BIC: {{ BIC }}</p>
      <input v-model="BIC" placeholder="pls insert receiverBIC Code">
    </div>
    <div class="input-group">
      <p class="label">Receiver IBAN: {{ IBAN }}</p>
      <input v-model="IBAN" placeholder="pls insert IBAN">
    </div>
    <div class="input-group">
      <p class="label">Receiver institution: {{ institution }}</p>
      <input v-model="institution" placeholder="pls insert receiver institution ">
    </div>
    <div class="input-group">
      <p class="label">Receiver name: {{ name }}</p>
      <input v-model="name" placeholder="pls insert receiver name ">
    </div>
    <div class="input-group">
      <p class="label">Amount: {{ amount }}</p>
      <input v-model="amount" placeholder="pls insert amount ">
    </div>
    <button @click="redirectToAccounts">Back to my Accounts</button>
    <button @click="resetPage">Discard</button>
    <button @click="doExecuteTransfer">Execute Transfer</button>
  </main>
</template>
<style>
.input-group {
  display: flex;
  align-items: center;
}
.label {
  margin-right: 10px;
}

</style>
