import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../components/container.vue')
    },
    {
      path: '/content/:id',
      name:'content',
      component: () => import('../components/NewsContent')
    }
  ]
})
