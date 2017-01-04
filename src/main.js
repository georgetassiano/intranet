// Import System requirements
import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './routes'
import store from './store'

// main.js
import VueGmaps from 'vue-gmaps'
Vue.use(VueGmaps, {
  key: 'AIzaSyAnj131tKCPSetMVbCtG0k2umGcvswK048',
  libraries: ['places']
})

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAnj131tKCPSetMVbCtG0k2umGcvswK048'
    // libraries: 'places', //// If you need to use place input
  }
})

// Import Helpers for filters
import { domain, count, prettyDate, pluralize, capitalize, reverse } from './filters'

// Import Views - Top level

import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('reverse', reverse)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)
Vue.filter('capitalize', capitalize)

// Resource logic
Vue.use(Resource)

Vue.use(VueRouter)

Vue.http.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('id_token')

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})
