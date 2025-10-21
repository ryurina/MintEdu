import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/student', name: 'student', component: () => import('./views/StudentView.vue'), meta: { requiresAuth: true } },
  { path: '/investor', name: 'investor', component: () => import('./views/InvestorView.vue'), meta: { requiresAuth: true } },
  { path: '/browse', name: 'browse', component: () => import('./views/BrowseLoansView.vue') },
  { path: '/privacy-policy', name: 'privacy', component: () => import('./views/Privacy.vue')},
  { path: '/terms', name: 'privacy', component: () => import('./views/TermsView.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    next('/')
  } else {
    next()
  }
})

export default router
