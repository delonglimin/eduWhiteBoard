import Vue from 'vue'
import '@/utils/localstorage'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import * as filters from './filters'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')