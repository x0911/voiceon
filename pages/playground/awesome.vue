<template>
  <div class="pb-10">
    <v-card tile flat>
      <v-card-title class="d-block pb-2">
        Hello, I'm navigated by your voice!
      </v-card-title>
      <v-card-text> To go back, say ' <b>Go back</b> ' </v-card-text>
    </v-card>
    <transcribe-speech></transcribe-speech>
  </div>
</template>

<script>
export default {
  components: {
    TranscribeSpeech: () =>
      import('~/components/playground/TranscribeSpeech.vue'),
  },
  layout: 'playground',
  data: () => ({}),
  methods: {},
}
</script>
