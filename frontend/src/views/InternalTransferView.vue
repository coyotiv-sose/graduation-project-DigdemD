<script>
import { mapState, mapActions } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBalanceTransferStore } from '@/stores/balanceTransfer'

export default{
  name:'InternalTransferView',
  components: {},
  data(){
    return {
      senderAccountId:'',
      receiverAccountId:'',
      amount: 0
    }
  },
  mounted(){},
  computed:{
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods:{
    ...mapActions(useBalanceTransferStore, ['executeInternalTransfer']),

  redirectToAccounts(){
    this.$router.push('/accounts')
  },
  resetPage(){
    this.senderAccountId = ''
    this.receiverAccountId = ''
    this.amount =0
  },
  async doExecuteTransfer(){
      await this.executeInternalTransfer(this.senderAccountId, this.receiverAccountId,this.amount)
      console.log('call execute transfer')
  }

  }

}
</script>
<template>
  <main>
    <h1>Internal Balance Transfer</h1>
    <div> Sender Account: {{senderAccountId}}
      <select v-model="senderAccountId">
      <option :value='account._id' v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }} </option>
      </select>
    </div>
    <div> Receiver Account: {{receiverAccountId}}
      <select v-model="receiverAccountId">
      <option :value='account._id' v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }} </option>
      </select>
    </div>
    <div class="input-group">
      <p class="label">Amount: {{ amount }}</p>
      <input type="number" v-model="amount" placeholder="pls insert amount ">
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
