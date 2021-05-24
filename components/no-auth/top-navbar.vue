<template>
  <div>
    <v-app-bar app color="white">
      <v-toolbar-title> VoiceOn </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn depressed to="/old"> Old Version </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    sidenav: {
      model: null,
      fixed: true,
      mini: false,
    },
  }),
  computed: {},
  mounted() {},
  methods: {},
}
</script>
