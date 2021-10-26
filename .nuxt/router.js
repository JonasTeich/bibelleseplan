import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _eafefb42 = () => interopDefault(import('..\\pages\\bible\\index.vue' /* webpackChunkName: "pages/bible/index" */))
const _5862578a = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _54ec31e9 = () => interopDefault(import('..\\pages\\plans\\index.vue' /* webpackChunkName: "pages/plans/index" */))
const _cf6fbf6e = () => interopDefault(import('..\\pages\\signup\\index.vue' /* webpackChunkName: "pages/signup/index" */))
const _2ebb78e4 = () => interopDefault(import('..\\pages\\plan\\_plan.vue' /* webpackChunkName: "pages/plan/_plan" */))
const _68a232e1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _fa40a098 = () => interopDefault(import('..\\pages\\_plan\\_day.vue' /* webpackChunkName: "pages/_plan/_day" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bible",
    component: _eafefb42,
    name: "bible"
  }, {
    path: "/login",
    component: _5862578a,
    name: "login"
  }, {
    path: "/plans",
    component: _54ec31e9,
    name: "plans"
  }, {
    path: "/signup",
    component: _cf6fbf6e,
    name: "signup"
  }, {
    path: "/plan/:plan?",
    component: _2ebb78e4,
    name: "plan-plan"
  }, {
    path: "/",
    component: _68a232e1,
    name: "index"
  }, {
    path: "/:plan/:day?",
    component: _fa40a098,
    name: "plan-day"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
