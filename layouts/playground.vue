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
            <div>
              <v-card tile flat>
                <v-card-title class="pb-2"> Hints </v-card-title>
                <v-card-text>
                  <div>
                    - Look at the bottom right button, It has 3 main states
                  </div>
                  <div>
                    - If it is in the <b>disabled</b> state, this means that
                    <b>VoiceOn</b> has detected a voice activity and analyzing
                    it for available commands - You can <b>NOT</b> click on the
                    button in this case or give any commands
                  </div>
                  <div>
                    - If button is <b style="color: #00c9a7">Green</b>, this
                    means that <b>continuous mode</b> is turned off and you can
                    click on the button to start giving commands
                  </div>
                  <div>
                    - If button is <b class="error--text">Red</b>, this means
                    that <b>VoiceOn</b> is listening for commands right now and
                    you can click on it to let <b>VoiceOn</b> analyze and run
                    your command
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    AppTopNavbar: () =>
      import('@/components/playground/no-auth/top-navbar.vue'),
  },
  data: () => ({}),
  mounted() {
    this.setDefaults()
  },
  methods: {},
}
</script>
