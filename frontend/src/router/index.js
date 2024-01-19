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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/accounts',
      name: 'accounts',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AccountsView.vue')
    },
    {
      path: '/trades',
      name: 'trades',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ]
})

export default router
