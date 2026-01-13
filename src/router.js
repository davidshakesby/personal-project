import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/index.vue'
import About from './views/about.vue'
import Todo from './views/todoView.vue'
import Portfoilo from './views/portfoilo.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/todo', name: 'Todo List', component: Todo },
  { path: '/portfoilo', name: 'Portfoilo', component: Portfoilo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
