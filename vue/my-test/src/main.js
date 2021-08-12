import Vue from 'vue'
import App from './App.vue'
import router from './krouter'
import store from './kstore'

import create from './utils/create'

Vue.config.productionTip = false
// Vue.prototype.$create = create
Vue.use(create)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
