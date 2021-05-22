<template>
  <div>
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
}
</script>
