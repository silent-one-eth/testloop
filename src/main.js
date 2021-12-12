import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

const state = Vue.observable({ 
  account: null,
  loopringAccountId: null,
  loopringApiKey: null
});

Vue.prototype.$state = state;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
