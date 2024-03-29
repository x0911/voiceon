<template>
  <div>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        @click="sidenav.model = !sidenav.model"
      ></v-app-bar-nav-icon>
      <v-btn to="/" x-large color="transparent" tile depressed>
        <v-toolbar-title>
          <div class="text-center">
            <div class="lh-1 mt-2">VoiceOn</div>
            <div class="lh-1">
              <small class="fs-2">Under Construction</small>
            </div>
          </div>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="me-2">
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
        <v-skeleton-loader
          v-if="loadingCommands"
          type="list-item-three-line@5"
        ></v-skeleton-loader>
        <template v-else>
          <template v-if="errors.loadingCommands">
            <div
              border="top"
              class="pt-6 text-center px-4 grey--text text--darken-1"
            >
              <div class="mb-4">
                <v-avatar color="error lighten-5" size="35">
                  <v-icon color="error">mdi-exclamation-thick</v-icon>
                </v-avatar>
              </div>
              <div class="mb-1">Can't load available commands</div>
              <div class="lh-1">
                <small>
                  Please check your internet connection and make sure you're not
                  behind a proxy
                </small>
              </div>
            </div>
          </template>
          <template v-else>
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
          </template>
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
    loadingCommands: false,
    errors: {
      loadingCommands: false,
    },
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
      this.$set(this, 'loadingCommands', true)
      LanguageModelService.getIntents()
        .then((data) => {
          this.$set(this, 'commands', data)
        })
        .catch((err) => {
          console.log(err)
          this.$set(this.errors, 'loadingCommands', true)
        })
        .finally(() => {
          this.$set(this, 'loadingCommands', false)
        })
    },
  },
}
</script>
