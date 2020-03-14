import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  },
  {
    path: '/outcome',
    name: 'Outcome',
    component: () =>
      import(/* webpackChunkName: "outcome" */ '../views/Outcome.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
