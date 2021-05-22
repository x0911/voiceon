<template>
  <div>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        @click="sidenav.model = !sidenav.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title> VoiceOn </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn depressed @click="toggleContinuousMode()">
          <div>
            <div>
              Continuous Mode :
              <span
                :class="`ms-1 ${
                  continuousMode ? 'success' : 'error'
                }--text font-weight-bold`"
              >
                {{ continuousMode ? 'ON' : 'OFF' }}
              </span>
            </div>
            <div>
              <small> ( Click to toggle ) </small>
            </div>
          </div>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidenav.model"
      :temporary="!sidenav.fixed"
      app
      :mini-variant.sync="sidenav.mini"
      :right="$vuetify.rtl"
      overflow
      width="300"
    >
      <v-list>
        <v-subheader class="font-weight-medium">
          Available Commands
        </v-subheader>
        <v-divider></v-divider>
        <template v-for="(command, i) in commands">
          <v-list-item :key="i" class="wrap">
            <v-list-item-content>
              <v-list-item-title>
                {{ command.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <template v-for="(example, ei) in command.examples">
                  <div :key="`e_${ei}`">
                    {{ example }}
                  </div>
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import LanguageModelService from '@/services/LanguageModelService.js'
export default {
  data: () => ({
    sidenav: {
      model: null,
      fixed: true,
      mini: false,
    },
    commands: [],
  }),
  computed: {
    continuousMode() {
      return this.$store.state.options?.rhasspy?.continuousMode
    },
  },
  mounted() {
    this.getIntents()
  },
  methods: {
    toggleContinuousMode() {
      this.$store.commit('options/toggleContinuousMode')
    },
    getIntents() {
      LanguageModelService.getIntents()
        .then((data) => {
          this.$set(this, 'commands', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
