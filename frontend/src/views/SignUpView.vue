<script>
import axios from 'axios'
export default {
  name: 'SignUpView',
  components: {},
  data() {
    return {
      name: '',
      surname: '',

      email: '',
      mobile: '',
      password: ''
    }
  },
  methods: {
    async signUp() {
      const newUser = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/authentication/newUser',
        {
          name: this.name,
          surname: this.surname,

          email: this.email,
          mobile: this.mobile,
          password: this.password
        },
        { withCredentials: true }
      )
      if (newUser) {
        this.user = newUser.data
        this.status = 'Register successful'
      } else {
        this.user = null
        this.status = 'Register failed'
      }
      console.log(newUser.data)
    }
  }
}
</script>
<template>
  <form v-on:submit.prevent>
    <input type="text" placeholder="Name" v-model="name" required />
    <input type="text" placeholder="Surname" v-model="surname" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="text" placeholder="Mobile" v-model="mobile" required />
    <input type="text" placeholder="Password" v-model="password" required />
    <button type="submit" @click="signUp">SignUp</button>
    <label>{{ status }}</label>
    <label v-if="user">Wilkommen</label>
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
