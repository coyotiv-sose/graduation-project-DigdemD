<script>
import { mapState, mapActions } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'


export default{
  name:'InternalTransferView',
  components: {},
  data(){
    return {
      senderAccount:{},
      receiverAccount:{},
      amount: 0
    }
  },
  mounted(){},
  computed:{
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods:{
    //...mapActions(useBalanceTransferStore, ['executeTransfer']),

  redirectToAccounts(){
    this.$router.push('/accounts')
  },
  resetPage(){
    this.senderAccount = {}
    this.receiverAccount = {}
    this.amount =0
  },
  async doExecuteTransfer(){
    //add fuction parameters and mapActions after store definition
    // console.log('///selectedAccountId', this.selectedAccount._id )
    // console.log('///amount', this.amount )
    //   await this.executeTransfer(this.selectedAccount, this.IBAN,this.amount)
    //   console.log('call execute transfer')
  }

  }
}
</script>
<template>
  <main>
    <h1>Internal Balance Transfer</h1>
    <div> Sender Account: {{senderAccount}}
      <select v-model="senderAccount">
      <option :value='account._id' v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }}</option>
      </select>
    </div>
    <div> Receiver Account: {{receiverAccount}}
      <select v-model="receiverAccount">
      <option :value='account._id' v-for="account in user.accounts" :key="account._id">{{ account._id }} - {{ account.currency }} - {{ account.name }}</option>
      </select>
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
