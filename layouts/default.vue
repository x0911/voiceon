<template>
  <v-app>
    <app-top-navbar></app-top-navbar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <nuxt />
          </v-col>
          <v-col cols="auto">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col>
            <transcribe-speech></transcribe-speech>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    AppTopNavbar: () => import('@/components/no-auth/top-navbar.vue'),
    TranscribeSpeech: () => import('@/components/TranscribeSpeech.vue'),
  },
  data: () => ({}),
  mounted() {},
  methods: {},
}
</script>
