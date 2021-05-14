import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8085/";

axios.interceptors.request.use( (config) => {
  const token = store.getters.StateUser;
  if (token) {
    config.headers['X-AUTH-TOKEN'] =  token;
  }
  return config;
})


Vue.use(Vuex);

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')