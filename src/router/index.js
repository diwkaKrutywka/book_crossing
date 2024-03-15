import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { useAppStore } from '../stores/index'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/books/all',
    children: [
      {
        path: '/books/all',
        name: 'BookList',
        component: () => import('../views/book/BookList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
