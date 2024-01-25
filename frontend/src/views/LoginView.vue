<script>
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['login']),

    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/cockpit')
    }
  }
}
</script>
<template>
  <form v-on:submit.prevent>
    <input type="text" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit" @click="doLogin">Login</button>
    <label>{{ status }}</label>
    <label v-if="user">Are u allowed to see this?</label>
  </form>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
</style>
