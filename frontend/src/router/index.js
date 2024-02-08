import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountsView from '../views/AccountsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../views/AccountsView.vue')
    },
    {
      path: '/accounts/externalTransfer',
      name: 'externalTransfer',
      component: () => import('../views/ExternalTransferView.vue')
    },
    {
      path: '/accounts/internalTransfer',
      name: 'internalTransfer',
      component: () => import('../views/InternalTransferView.vue')
    },
    {
      path: '/accounts/newAccount',
      name: 'newAccount',
      component: () => import('../views/NewAccountView.vue')
    },
    {
      path: '/tradeHistory',
      name: 'tradeHistory',
      component: () => import('../views/TradesView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
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
