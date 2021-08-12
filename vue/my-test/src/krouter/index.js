import Vue from 'vue'
import VueRouter from './vue-router'
import Home from '@/components/home'
import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/hello',
    component: HelloWorld,
    children: [
      {
        path: '/hello/info',
        component: { render(h) { return h('div', 'info page') } }
      }
    ]
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
