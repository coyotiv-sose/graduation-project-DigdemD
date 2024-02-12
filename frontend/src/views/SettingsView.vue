<script>
import { useSettingStore } from '@/stores/setting'
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions, mapState, mapStores } from 'pinia'

export default {
  name: 'SettingsView',
  components: {},
  data() {
    return {
      name: '',
      surname: '',
      mobile: '',
      minTradeLimit: '',
      maxTradeLimit: '',
      clickAndTrade: '',
      unselectedCurrencies: [],
      selectedCurrencies: [],
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  async mounted() {
    const availableCurrencyPairs = ['EUR/USD', 'EUR/TRY', 'EUR/JPY', 'GBP/CAD', 'GBP/USD']
    ;(this.name = this.user.name),
      (this.surname = this.user.surname),
      (this.mobile = this.user.mobile),
      (this.minTradeLimit = this.user.minTradeLimit),
      (this.maxTradeLimit = this.user.maxTradeLimit),
      (this.clickAndTrade = this.user.clickAndTrade),
      (this.unselectedCurrencies = availableCurrencyPairs.filter(
        (pair) => !this.user.currencyPairs.includes(pair)
      )),
      (this.selectedCurrencies = this.user.currencyPairs)

    // this.box1 = this.box1.filter((item) => item !== option)

    // this.user = await this.settingStore.fetchUser()
  },
  computed: {
    ...mapStores(useSettingStore),
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    // ...mapActions(useSettingStore, ['fetchUser'])
    ...mapActions(useSettingStore, ['updateUser']),
    doUpdateUser() {
      const newValues = {
        name: this.name || this.user.name,
        surname: this.surname || this.user.surname,
        mobile: this.mobile || this.user.mobile,
        minTradeLimit: this.minTradeLimit || this.user.minTradeLimit,
        maxTradeLimit: this.maxTradeLimit || this.user.maxTradeLimit,
        clickAndTrade: this.clickAndTrade || this.user.clickAndTrade,
        currencyPairs: this.box2 || this.user.currencyPairs
      }
      this.updateUser(this.user._id, newValues)
    },
    moveToSelectedCurrencies() {
      this.selectedOptions.forEach((option) => {
        this.selectedCurrencies.push(option)
        this.unselectedCurrencies = this.unselectedCurrencies.filter((item) => item !== option)
      })
      this.selectedOptions = []
    },
    moveToUnselectedCurrencies() {
      this.selectedOptions2.forEach((option) => {
        this.unselectedCurrencies.push(option)
        this.selectedCurrencies = this.selectedCurrencies.filter((item) => item !== option)
      })
      this.selectedOptions2 = []
    }
  }
}
</script>
<template>
  <main>
    <form @submit.prevent="doUpdateUser">
      <div class="UserPersonalDetails">
        <!-- //burayi tamamla -->
        <h1>Personal Settings</h1>
        <label for="name">name </label>
        <input id="name" v-model="name" :placeholder="user.name" />
        <br />
        <label for="surname">surname </label>
        <input v-model="surname" :placeholder="user.surname" />
        <br />
        <label for="email">email </label>
        <input v-model="email" disabled :placeholder="user.email" />
        <br />
        <label for="password">password </label>
        <input v-model="password" disabled :placeholder="user.password" />
        <br />
        <label for="mobile">mobile </label>
        <input v-model="mobile" :placeholder="user.mobile" />
        <br />
      </div>
      <div>
        <h1>Platform Settings</h1>
        <p>Currency Pair Selection</p>
        <div id="app" class="select-container">
          <select v-model="selectedOptions" multiple>
            <option v-for="option in unselectedCurrencies" :value="option">{{ option }}</option>
          </select>
          <div class="button-look">
            <button @click="moveToSelectedCurrencies">add</button>
            <br />
            <button @click="moveToUnselectedCurrencies">remove</button>
          </div>
          <select v-model="selectedOptions2" multiple>
            <option v-for="option in selectedCurrencies">{{ option }}</option>
          </select>
        </div>
        <br />
        Min Trade Limit(USD) <input v-model="minTradeLimit" :placeholder="user.minTradeLimit" />
        <br />
        Max Trade Limit(USD) <input v-model="maxTradeLimit" :placeholder="user.maxTradeLimit" />
        <br />
        Click & Trade Control <input v-model="clickAndTrade" type="checkbox" />
      </div>
      <button type="submit">Save Update</button>
    </form>
  </main>
</template>
<style>
.select-container {
  display: flex;
  justify-content: left;
  align-items: center;
}
.button-look {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
