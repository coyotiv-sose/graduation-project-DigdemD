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
      minTradeLimit: 0,
      maxTradeLimit: 0,
      clickAndTrade: true
    }
  },
  async mounted() {
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
        surname: this.surname,
        mobile: this.mobile,
        minTradeLimit: this.minTradeLimit,
        maxTradeLimit: this.maxTradeLimit,
        clickAndTrade: this.clickAndTrade
      }
      this.updateUser(this.user._id, newValues)
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
        <label for="name">name</label>
        <input id="name" v-model="name" :placeholder="user.name" />
        <br />
        surname <input v-model="surname" :placeholder="user.surname" />
        <br />
        e-mail <input disabled :placeholder="user.email" />
        <br />
        password <input disabled :placeholder="user.password" />
        <br />
        mobile <input v-model="mobile" :placeholder="user.mobile" /> {{}}
        <br />
      </div>
      <div>
        <h1>Platform Settings</h1>
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
<style></style>
