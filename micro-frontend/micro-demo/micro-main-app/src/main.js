import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3000',
    container: '#main-container',
    activeRule: '/react',
  },
  {
    name: 'vue app',
    entry: '//localhost:8080',
    container: '#main-container',
    activeRule: '/vue',
  },
]);

start();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
