/**
 * ? I've forked vue-socket.io-extended which is a fork from vue-socket.io
 * ? I'll use the root structure for vue-socket.io-extended to build a new package
 * ? This package helps Vue.js applications connect with Rhasspy better
 */

import Vue from 'vue'
// if (!Vue.__voiceon_commander__) {
//   Vue.__voiceon_commander__ = true
//   const strategies = Vue.config.optionMergeStrategies
//   strategies.commands = strategies.methods
// }

// import Vue from 'vue'
import RhasspyCommander from 'rhasspy-commander'
// Vue.use(RhasspyCommander)

// import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'

const socket = io('https://voice.mmw.pw:12101')

Vue.use(RhasspyCommander, socket)
