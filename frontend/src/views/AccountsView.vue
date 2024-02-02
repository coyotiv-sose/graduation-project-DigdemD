<script>
import { useAccountStore } from '@/stores/account'
import { mapStores, mapActions, mapState } from 'pinia'
import axios from 'axios'
import { useAuthenticationStore } from '@/stores/authentication'
import { cockpitStore } from '@/stores/cockpit'

export default {
  name: 'AccountsView',
  components: {},
  data() {
    return {
      accounts: []
    }
  },
  async mounted() {
    this.connect()
    this.accounts = await this.accountStore.fetchAccounts()
    console.log ('we would like to see accoount', this.accounts)
  },
  computed: {
    ...mapStores(useAccountStore),
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(cockpitStore, ['connect']),
    ...mapActions(useAccountStore,['updateAccount']),

    async doAddAccount( currency) {
      await this.addAccount( currency)
    },


    addAccount() {
      this.$router.push(`/accounts/newAccount`)
    },
    toggleEditing(account){
      account.originalData = {...account}
      account.editing=true
    },
    cancelEditing(account){

      account.status=account.originalData.status
      account.name=account.originalData.name
      account.isDefault=account.originalData.isDefault

      account.editing=false
    },
     async saveEditing(account, status,name, isDefault ){
      newValues: {
        account.status,
        account.name,
        account.isDefault
        }
        await this.updateAccount(newValues)
        this.$router.push('/accounts')
        account.editing=true
    }

  }
}
</script>
<template>
  <main>
    <h1>Your Accounts</h1>
    <div class="AccountList">
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Is Default Account?</th>
            <th>Account Name</th>
            <th>Account Opening Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account._id">
            <td>{{ account._id }}</td>
            <td>{{ account.currency }}</td>
            <td>{{ account.balance }}</td>
            <!-- <td>{{ account.status }}</td>
            <td>{{ account.isDefault }}</td>
            <td>{{ account.name }}</td> -->


            <td>
              <div v-if="!account.editing">
                {{ account.status }}
              </div>
              <div v-else>
                <input v-model="account.status" />
              </div>
            </td>
            <td>
              <div v-if="!account.editing">
                {{ account.isDefault }}
              </div>
              <div v-else>
                <input type="checkbox" v-model="account.isDefault" />
              </div>
            </td>
            <td>
              <div v-if="!account.editing">
                {{ account.name }}
              </div>
              <div v-else>
                <input v-model="account.name" />
              </div>
            </td>



            <td>{{ account.createdAt }}</td>
            <td v-if="!account.editing"><button @click='toggleEditing(account)' >Edit</button></td>
            <td v-if="account.editing">
              <button  @click="saveEditing(newValues)">Save</button>
              <button  @click="cancelEditing(account)">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <br />
    <div class="Balance Transfer">
      <href>Balance Transfer</href>
    </div>
    <div class="AddAccount">
      <h1>Would you like to open a new account?</h1>
      <!-- <button @click="doExecuteTrade(pair, 'sell', pair.sellRate)">
        Add Account: {{ pair.sellRate }}
      </button> -->
      <button @click="addAccount()">Open New Account</button>
    </div>
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
