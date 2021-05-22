import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
const { wsURL: url } = require('@/assets/api-url.js')
const wsURL = `${url}/api/events/log`
Vue.use(VueNativeSock, wsURL, {
  reconnection: true,
})
