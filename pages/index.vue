<template>
  <div>
    <v-card tile flat>
      <v-card-title> Options </v-card-title>
      <v-card-text>
        <div class="font-weight-medium secondary--text">
          While continuous mode is ON
        </div>
        <div>
          How many milliseconds should VoiceOn wait before analyzing commands?
        </div>
        <div>Default is: 2000</div>
        <v-text-field
          v-model="localOptions.listenSeconds"
          outlined
          class="mt-2"
          label="eg: 2000"
          placeholder="eg: 2000"
          type="number"
          single-line
          hint="Changes take effect immediately"
          persistent-hint
        ></v-text-field>
        <div class="mt-2 font-weight-medium secondary--text">
          While continuous mode is OFF
        </div>
        <div>
          Would you like to set a timeout instead of manually clicking the
          button to stop recording command?
        </div>
        <div>Default is: NO</div>
        <v-btn-toggle
          v-model="localOptions.hasTapRecordingTimeout"
          class="mt-2"
          mandatory
        >
          <v-btn class="px-8" text active-class="success--text" :value="true">
            YES
          </v-btn>
          <v-btn class="px-8" text active-class="error--text" :value="false">
            NO
          </v-btn>
        </v-btn-toggle>
        <v-slide-y-transition>
          <div v-if="localOptions.hasTapRecordingTimeout">
            <div class="mt-4 font-weight-medium secondary--text">
              How many milliseconds for that timeout?
            </div>
            <div>Default is : 2000</div>
            <v-text-field
              v-model="localOptions.tapRecordingTimeout"
              outlined
              class="mt-2"
              label="eg: 2000"
              placeholder="eg: 2000"
              type="number"
              single-line
              hint="Changes take effect immediately"
              persistent-hint
            ></v-text-field>
          </div>
        </v-slide-y-transition>
      </v-card-text>
    </v-card>
    <v-card tile flat>
      <v-card-title class="pb-2"> Available commands </v-card-title>
      <v-card-text>
        <div>You can see <b>available commands</b> in the left sidebar</div>
        <div>Click on the hamburger button on the top left to toggle it</div>
      </v-card-text>
    </v-card>
    <v-card tile flat>
      <v-card-title class="pb-2"> Continuous mode </v-card-title>
      <v-card-text>
        <div>It is disabled by default</div>
        <div>
          Try the experience with VoiceOn app without the continuous mode.
        </div>
        <div>Then turn it on to see the difference</div>
        <div>
          After turning continuous mode on, you'll need to say the wake word
        </div>
        <div>It's ' Jarvis ', then you can begin giving commands.</div>
      </v-card-text>
    </v-card>
    <v-card tile flat>
      <v-card-title class="pb-2"> Command tips </v-card-title>
      <v-card-text>
        <template v-for="(tip, i) in tips">
          <div :key="i" class="mb-3">
            <div>
              <span class="font-weight-medium">
                {{ i + 1 }}.
                {{ tip.title }}
              </span>
              <template v-for="(alias, ai) in tip.aliases">
                <br :key="`alias_${ai}`" />
                - alias : {{ alias }}
              </template>
            </div>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    localOptions: {
      listenSeconds: 2000,
      hasTapRecordingTimeout: false,
      tapRecordingTimeout: 2000,
    },
    tips: [
      {
        title: "Say ' go home ' to navigate to home page",
        aliases: ['go home page', 'go to home page', 'go to home'],
      },
      {
        title: "Say ' go to awesome page ' to navigate to the awesome page",
        aliases: ['go awesome page'],
      },
      {
        title: "Say ' go back ' to navigate backward",
        aliases: [],
      },
      {
        title: "Say ' open login modal ' to show the login modal",
        aliases: ['view login modal', 'show login modal'],
      },
      {
        title: "Say ' open register modal ' to show the register modal",
        aliases: ['view register modal', 'show register modal'],
      },
      {
        title: "Say ' hide modal ' to hide any active modal",
        aliases: [
          'close modal',
          'hide login modal ( Hide the login modal only )',
          'hide register modal ( Hide the register modal only )',
          'hide {modal name} modal ( Hide modal with that name only )',
        ],
      },
    ],
  }),
  computed: {
    options() {
      return this.$store.state.options.rhasspy
    },
  },
  watch: {
    localOptions: {
      handler(v) {
        this.$store.commit('options/updatedRhasspyOptions', { ...v })
      },
      deep: true,
    },
  },
  mounted() {
    this.setDefaultOptions()
  },
  methods: {
    setDefaultOptions() {
      const options = { ...this.options }
      Object.keys(options).forEach((key) => {
        this.$set(this.localOptions, key, options[key])
      })
    },
  },
}
</script>
