import { createRouter, createWebHistory } from 'vue-router'
import CommandesView from '@/views/CommandesView.vue'
import CommandeDetailView from '@/views/CommandeDetailView.vue'
import ClientView from '@/views/ClientView.vue'
import LoginPage from '@/components/LoginPage.vue'
import Products from '@/components/Products.vue'
import Dashboard from '@/components/Dashboard.vue'
import Users from '@/components/Users.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Products,
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    { 
        path: '/orders',
        name: 'orders',
        component: CommandesView 
    },
    { 
      path: '/commande/:id',
      name: 'singleOrder',
       component: CommandeDetailView 
      },
    { 
      path: '/client/:name',
      name: 'singleClient',
      component: ClientView 
    },
  ],
})

export default router
