<template>
  <div class="white mb-16 pb-16">
    <v-sheet
      color="primary"
      dark
      style="position: relative"
      class="overflow-hidden py-sm-16 pt-16"
    >
      <figure style="position: absolute; top: 0; left: 0; width: 60%">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1246 1078"
        >
          <g opacity=".4">
            <linearGradient
              id="doubleEllipseTopLeftID1"
              gradientUnits="userSpaceOnUse"
              x1="2073.5078"
              y1="1.7251"
              x2="2273.4375"
              y2="1135.5818"
              gradientTransform="matrix(-1 0 0 1 2600 0)"
            >
              <stop offset="0.4976" style="stop-color: #559bff"></stop>
              <stop offset="1" style="stop-color: #377dff"></stop>
            </linearGradient>
            <polygon
              fill="url(#doubleEllipseTopLeftID1)"
              points="519.8,0.6 0,0.6 0,1078 863.4,1078   "
            ></polygon>
            <linearGradient
              id="doubleEllipseTopLeftID2"
              gradientUnits="userSpaceOnUse"
              x1="1717.1648"
              y1="3.779560e-05"
              x2="1717.1648"
              y2="644.0417"
              gradientTransform="matrix(-1 0 0 1 2600 0)"
            >
              <stop offset="1.577052e-06" style="stop-color: #559bff"></stop>
              <stop offset="1" style="stop-color: #377dff"></stop>
            </linearGradient>
            <polygon
              fill="url(#doubleEllipseTopLeftID2)"
              points="519.7,0 1039.4,0.6 1246,639.1 725.2,644   "
            ></polygon>
          </g>
        </svg>
      </figure>
      <figure
        v-if="$vuetify.breakpoint.smAndUp"
        style="
          position: absolute;
          bottom: 0;
          right: 0;
          margin-bottom: -0.5rem;
          width: 100%;
        "
      >
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
        >
          <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
        </svg>
      </figure>
      <v-layout
        fill-height
        class="text-center"
        align-center
        justify-center
        align-content-center
      >
        <v-flex xs11 sm10 md7 lg5>
          <v-card color="transparent" flat tile class="mb-16 mt-4 mt-sm-16">
            <h1
              class="text-h2 text-sm-h1 font-weight-bold mb-4"
              style="line-height: 0.75em"
            >
              <small> Control life with your voice </small>
            </h1>
            <v-card-text
              style="font-size: 20px; line-height: 1.5em"
              class="px-0 mb-6 white--text"
            >
              VoiceOn is your ullamco esse incididunt esse consectetur duis aute
              elit velit. Pariatur laboris duis dolor veniam ex culpa et.
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn to="/playground" x-large class="px-10" color="white" light>
                Try VoiceOn
              </v-btn>
              <v-btn large class="px-5" text @click="startTour()">
                How it works
                <v-icon class="ms-2">mdi-play-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-sheet>
    <voiceon-tour ref="voiceonTour"></voiceon-tour>
  </div>
</template>

<script>
export default {
  components: {
    VoiceonTour: () => import('@/components/no-auth/voiceon-tour.vue'),
  },
  layout: 'landing',
  data: () => ({}),
  mounted() {},
  methods: {
    startTour() {
      this.$refs.voiceonTour.startTour()
    },
  },
}
</script>
