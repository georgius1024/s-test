import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.config.errorHandler = error => {
  store.commit('message', { text: error.message, color: 'error' })
  router.push('/')
}
window.onerror = e => alert(e.message)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
