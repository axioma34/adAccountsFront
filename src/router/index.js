import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/accounts',
    name:'Accounts',
    component: () => import('../views/Accounts.vue')
  },
  {
    path:'/users',
    name:'Users',
    component: () => import('../views/Users')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(store.getters.isAuthenticated)
  if(to && to.path !== '/login') {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else if (to.path === '/login' && store.getters.isAuthenticated) {
    next('/users')
    return
  }
  next()
})

export default router
