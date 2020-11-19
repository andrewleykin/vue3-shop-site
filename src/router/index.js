import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../pages/Catalog.vue'

const routes = [
  {
    path: '/',
    name: 'CatalogPage',
    component: Catalog,
    meta: {
      title: 'Магазин фруктов'
    }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/auth',
    name: 'AuthPage',
    meta: {
      layout: 'empty'
    },
    component: () => import('../pages/Auth.vue')
  },
  {
    path: '/registartion',
    name: 'RegistartionPage',
    meta: {
      layout: 'empty'
    },
    component: () => import('../pages/Registration.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: () => import('../pages/Product.vue')
  },
  {
    path: '/profile/:id',
    name: 'ProfilePage',
    meta: {
      requiresAuth: true
    },
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import('../pages/Cart.vue')
  },
  {
    path: '/order',
    name: 'OrderPage',
    meta: {
      requiresAuth: true
    },
    component: () => import('../pages/Order.vue')
  },
  {
    path: '/order/list',
    name: 'OrderListPage',
    meta: {
      requiresAuth: true
    },
    component: () => import('../pages/Orders.vue')
  },
  {
    path: '/order/list/:id',
    name: 'OrderDetailPage',
    meta: {
      requiresAuth: true
    },
    component: () => import('../pages/OrderDetail.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
