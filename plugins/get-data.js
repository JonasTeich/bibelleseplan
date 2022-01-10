export default function ({ app, store }) {
  app.router.onReady(() => {
    store.dispatch('users/initData')
    store.dispatch('prayerrequests/initRequests')
  })
}