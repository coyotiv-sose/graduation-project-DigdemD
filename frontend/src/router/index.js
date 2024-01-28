import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountsView from '../views/AccountsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:userId/accounts',
      name: 'accounts',
      component: () => import('../views/AccountsView.vue')
    },
    {
      path: '/:userId/accounts/openAccount',
      name: 'openAccount',
      component: () => import('../views/OpenAccountView.vue')
    },

    {
      path: '/:userId/tradeHistory',
      name: 'tradeHistory',
      component: () => import('../views/TradesView.vue')
    },
    {
      path: '/login', // the url u type in browser such as localhost:5137/test
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signUp', // the url u type in browser such as localhost:5137/test
      name: 'signUp',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/logout', // the url u type in browser such as localhost:5137/test
      name: 'logout',
      component: () => import('../views/Header.vue')
    },
    {
      path: '/cockpit',
      name: 'cockpit',
      component: () => import('../views/CockpitView.vue')
    }
  ]
})

export default router
