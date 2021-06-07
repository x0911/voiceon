import fs from 'fs'
import path from 'path'
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true, // false

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server', // static

  env: {
    HOST: '0.0.0.0',
    NODE_ENV: 'production',
    NPM_CONFIG_PRODUCTION: false,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - VoiceOn',
    title: 'Your voice assistant',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: '/recorder.js',
        body: true,
        // async: true,
        // crossorigin: "anonymous"
      },
    ],
  },

  layoutTransition: {
    name: 'slide-up',
    // mode: 'out-in',
  },

  pageTransition: {
    name: 'slide-down',
    // mode: 'in-out',
  },

  loading: {
    color: '#1976d2',
    failedColor: '#ff5252',
    height: '8px',
    continuous: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss', 'vue-tour/dist/vue-tour.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-local-storage.js',
      ssr: false,
    },
    {
      src: '~/plugins/mixins.js',
      ssr: false,
    },
    {
      src: '~/plugins/RhasspyConnection.js',
      ssr: false,
    },
    {
      src: '~/plugins/VueLodash.js',
      ssr: false,
    },
    {
      src: '~/plugins/vue-tour.js',
      ssr: false,
    },
    {
      src: '~/plugins/vue-awesome-countdown.js',
      ssr: false,
    },
    // {
    //   src: '~/plugins/Commander.js',
    //   ssr: false,
    // },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    [
      '@nuxtjs/eslint-module',
      {
        cache: false,
      },
    ],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  eslint: {
    cache: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    workbox: {
      skipWaiting: true,
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      current: 'en',
    },
    rtl: false,
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdiSvg', // mdi
    },
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    https: {
      key: fs.readFileSync(
        // path.resolve(__dirname, 'https/voice.mmw.pw/privkey.pem') // For my PC
        path.resolve('/etc/letsencrypt/live/voice.mmw.pw/privkey.pem') // For SSH Machine
      ),
      cert: fs.readFileSync(
        // path.resolve(__dirname, 'https/voice.mmw.pw/cert.pem') // For my PC
        path.resolve('/etc/letsencrypt/live/voice.mmw.pw/cert.pem') // For SSH Machine
      ),
    },
  },

  serverMiddleware: {
    '/api': '~/api/index.js',
  },
}
