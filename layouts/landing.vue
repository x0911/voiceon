<template>
  <v-app>
    <app-top-navbar></app-top-navbar>
    <v-main>
      <nuxt />
      <!-- <transcribe-speech></transcribe-speech> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    AppTopNavbar: () => import('@/components/no-auth/top-navbar.vue'),
    // TranscribeSpeech: () => import('~/components/TranscribeSpeech.vue'),
  },
  data: () => ({}),
  mounted() {
    this.setDefaults()
  },
  methods: {},
}
</script>
