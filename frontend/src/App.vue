<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { mapState, mapActions } from 'pinia'
import { socketStore } from './stores/socket'
import { useAuthenticationStore } from './stores/authentication'

export default {
  name: 'App',
  components: {
    HelloWorld,
    RouterLink,
    RouterView
  },
  async mounted() {
    this.connect()
    await this.fetchUser()
  },
  computed: {
    ...mapState(socketStore, ['connected', 'time']),
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(socketStore, ['connect']),
    ...mapActions(useAuthenticationStore, ['fetchUser'])
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Gybing FX Trading" />

      <!-- <p>Socket connection working: {{ connected ? 'yes' : 'no' }}</p> -->

      <!-- <p>Current time: {{ time }}</p> -->

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/cockpit">Cockpit</RouterLink>
        <RouterLink to="/accounts">Accounts</RouterLink>
        <RouterLink to="/tradeHistory">Trade History</RouterLink>

        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
