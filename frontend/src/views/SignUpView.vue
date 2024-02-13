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
      password: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    validateSignUp() {
      if (!this.name || !this.surname || !this.email || !this.mobile || !this.password) {
        this.errorMessage = 'Please fill in all fields.'
      } else {
        this.successMessage = 'Register successful'
        this.signUp()
      }
    },
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
        this.$router.push('/login')
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
  <form @submit.prevent="validateSignUp">
    <input type="text" placeholder="Name" v-model="name" required />
    <input type="text" placeholder="Surname" v-model="surname" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="text" placeholder="Mobile" v-model="mobile" required />
    <input type="text" placeholder="Password" v-model="password" required />
    <button type="submit" @click.prevent="validateSignUp">SignUp</button>
    <label>Are you already signed up?</label>
    <RouterLink to="/login">Login</RouterLink>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
.error-message {
  color: red;
}
.success-message {
  color: green;
}
</style>
