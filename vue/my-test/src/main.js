import Vue from 'vue'
import App from './App.vue'
import router from './krouter'

import create from './utils/create'

Vue.config.productionTip = false
// Vue.prototype.$create = create
Vue.use(create)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
