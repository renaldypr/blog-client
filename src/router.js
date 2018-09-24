import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import(/* webpackChunkName: "about" */ './views/Articles.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/ArticleAll.vue')
        },
        {
          path: ':id',
          name: 'details',
          props: true,
          component: () => import('./views/ArticleDetails.vue')
        },
        {
          path: '/form',
          name: 'form',
          component: () => import('./views/ArticleForm.vue')
        },
        {
          path: '/form/:id',
          name: 'editForm',
          props: true,
          component: () => import('./views/ArticleEdit.vue')
        }
      ]
    }
  ]
})
