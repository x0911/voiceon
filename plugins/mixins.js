import Vue from 'vue'

if (!Vue.__voiceon_mixin__) {
  Vue.__voiceon_mixin__ = true
  const mixins = require('@/mixins')
  Vue.mixin(mixins)
}
