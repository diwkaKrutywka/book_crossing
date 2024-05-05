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
      },
      {
        path: '/home/welcome',
        name: 'HomePage',
        component: () => import('../views/home/HomePage.vue')
      },
      {
        path: '/home/about-us',
        name: 'AboutUs',
        component: () => import('../views/about/AboutPage.vue')
      },
      {
        path: '/home/my-books',
        name: 'MyBooks',
        component: () => import('../views/user/books/MyBooks.vue')
      },
      {
        path: '/quizz/lending',
        name: 'LendingPage',
        component: () => import('../views/quizz/HomeLending.vue')
      },
      {
        path: 'user/quizz/list',
        name: 'MyQuizz',
        component: () => import('../views/quizz/MyQuizz.vue')
      },
      {
        path: '/quizz/take/:id',
        name: 'TakeQuizz',
        component: () => import('../views/quizz/SeeQuizz.vue')
      },
      {
        path: '/quizz/pass-quizz/:id',
        name: 'AnswerQuestion',
        component: () => import('../views/quizz/TakeQuizz.vue')
      },
      {
        path: '/quizz/create-new',
        name: 'CreateQuizz',
        component: () => import('../views/quizz/CreateQuizz.vue')
      },
      {
        path: '/book/about/:id',
        name: 'AboutBook',
        component: () => import('../views/book/AboutBook.vue')
      },
      {
        path: '/user/friends',
        name: 'MyFriends',
        component: () => import('../views/friends/MyFriends.vue')
      },
      {
        path: '/user/info/:userId/:bookId',
        name: 'AboutPerson',
        component: () => import('../views/friends/AboutPerson.vue')
      },
      {
        path: '/user/info/:id',
        name: 'SeePerson',
        component: () => import('../views/friends/SeePerson.vue')
      },
      {
        path: '/book/my-collections',
        name: 'MyCollections',
        component: () => import('../views/collections/MyCollections.vue')
      },
      {
        path: '/home/new-book/add-edit',
        name: 'AddEditBooks',
        component: () => import('../views/user/books/AddEditBook.vue')
      },
      {
        path: 'home/user/profile',
        name: 'Profile',
        component: () => import('../views/user/settings/Profile.vue')
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
