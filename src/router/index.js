import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import TopFiveView from '../views/TopFiveView.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView,
  },
  {
    path: '/top-five',
    name: 'topFive',
    component: TopFiveView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
