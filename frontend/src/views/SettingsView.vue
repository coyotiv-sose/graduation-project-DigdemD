<script>
import { useSettingStore } from '@/stores/setting'
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions, mapState, mapStores } from 'pinia'

export default {
  name: 'SettingsView',
  components: {},
  data() {
    return {}
  },
  async mounted() {
    // this.user = await this.settingStore.fetchUser()
  },
  computed: {
    ...mapStores(useSettingStore),
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(useSettingStore, ['fetchUser'])
  }
}
</script>
<template>
  <main>
    <div class="UserPersonalDetails">
      <h1>Personal Settings</h1>
      name <input v-model="userName" /> {{ user.name }}
      <br />
      surname <input /> {{ user.surname }}
      <br />
      e-mail <input disabled /> {{ user.email }}
      <br />
      password <input disabled /> {{ user.password }}
      <br />
      mobile <input /> {{ user.mobile }}
      <br />
    </div>
    <div>
      <h1>Platform Settings</h1>
      <br />
      Min Trade Limit(USD) <input /> {{ user.mobile }}
      <br />
      Max Trade Limit(USD) <input /> {{ user.mobile }}
      <br />
      Click & Trade Control <input type="checkbox" />
    </div>
  </main>
</template>
<style></style>
