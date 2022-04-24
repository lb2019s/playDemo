import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Page1 from '../views/Page1.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      depth: 1
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue'),
    meta: {
      depth: 2
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      depth: 3
    }
  },
  {
    path: '/page1',
    name: 'page1',
    component: Page1
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
