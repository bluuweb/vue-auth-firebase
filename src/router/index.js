import Vue from 'vue'
import VueRouter from 'vue-router'

import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const usuario = auth.currentUser
    console.log(usuario)

    if (!usuario) {
      next({
        path: '/Ingreso'
      })
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
