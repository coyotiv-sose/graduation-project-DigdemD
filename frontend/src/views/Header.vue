<script>
import axios from 'axios'
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions } from 'pinia'

export default {
  name: 'Header',

  methods: {
    ...mapActions(useAuthenticationStore, ['logout']),

    async doLogout() {
      console.log('successfully logged out')
      await this.logout()
      this.$router.push('/login')
      console.log('successfully logged out')
    }
  }
}
</script>
<template>
  <div>
    <a @click.prevent="doLogout" href="logout">Logout</a>
  </div>
</template>
<style scoped></style>
