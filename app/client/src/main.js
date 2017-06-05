import Vue from 'vue'
import App from './App.vue'
import router from './router'

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
export const SocketInstance = socketio('http://localhost:3000')
Vue.use(VueSocketIO, SocketInstance)

import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons'
Vue.component('icon', Icon);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})