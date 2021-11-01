import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _eafefb42 = () => interopDefault(import('..\\pages\\bible\\index.vue' /* webpackChunkName: "pages/bible/index" */))
const _5862578a = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _54ec31e9 = () => interopDefault(import('..\\pages\\plans\\index.vue' /* webpackChunkName: "pages/plans/index" */))
const _cf6fbf6e = () => interopDefault(import('..\\pages\\signup\\index.vue' /* webpackChunkName: "pages/signup/index" */))
const _68a232e1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _3312398b = () => interopDefault(import('..\\pages\\_plan\\index.vue' /* webpackChunkName: "pages/_plan/index" */))
const _4e93524e = () => interopDefault(import('..\\pages\\_plan\\_day\\index.vue' /* webpackChunkName: "pages/_plan/_day/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
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
    path: "/",
    component: _68a232e1,
    name: "index"
  }, {
    path: "/:plan",
    component: _3312398b,
    name: "plan"
  }, {
    path: "/:plan/:day",
    component: _4e93524e,
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
