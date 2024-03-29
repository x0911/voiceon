<template>
  <div>
    <v-card tile flat>
      <v-card-title> Breaking Changes </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item class="wrap">
            <v-list-item-icon>
              <v-icon color="#00c9a7">mdi-numeric-1-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Slower but more accurate </v-list-item-title>
              <v-list-item-subtitle>
                <div class="lh-1-5">
                  <div>
                    <div
                      style="
                        width: 50px;
                        height: 3px;
                        background-color: #00c9a7;
                      "
                      class="mt-1 mb-2"
                    ></div>
                  </div>
                  <div>
                    While on <b>Continuous Mode</b>, If you gave a command,
                    <b>VoiceOn</b> will wait to analyze that command before
                    beginning to listen to another one.
                  </div>
                  <div>
                    This change will prevent accedently run untold commands. It
                    fixed the " News " bug, "Go back" bug, and "Go home" bug
                  </div>
                  <div>This will make <b>VoiceOn</b> slower but accurate.</div>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="wrap">
            <v-list-item-icon>
              <v-icon color="#00c9a7">mdi-numeric-2-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> No wake command! </v-list-item-title>
              <v-list-item-subtitle>
                <div class="lh-1-5">
                  <div>
                    <div
                      style="
                        width: 50px;
                        height: 3px;
                        background-color: #00c9a7;
                      "
                      class="mt-1 mb-2"
                    ></div>
                  </div>
                  <div>
                    Just for testing, We'll run the
                    <b>Continuous Mode</b> without a wake command using
                    <b>Kaldi</b> mode <b>ARPA</b>
                  </div>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card tile flat>
      <v-card-title> Options </v-card-title>
      <v-card-text>
        <div class="font-weight-medium secondary--text">
          While continuous mode is ON
        </div>
        <div>
          How many milliseconds should VoiceOn wait before analyzing commands?
        </div>
        <div>Default is: {{ options.defaultListenSeconds }}</div>
        <v-text-field
          v-model="localOptions.listenSeconds"
          outlined
          class="mt-2"
          :label="`eg: ${options.defaultListenSeconds}`"
          :placeholder="`eg: ${options.defaultListenSeconds}`"
          type="number"
          single-line
          hint="Changes take effect immediately"
          persistent-hint
        ></v-text-field>
        <div class="font-weight-bold">
          How much your voice should be laud to begin listening and analyzing
          your commands?
        </div>
        <div>
          If you gonna lower this value, <b>VoiceOn</b> may listen to every
          voice around you, even the ant sound walking on your table and analyze
          it into commands :"D
        </div>
        <div>Default is: {{ options.defaultMinVolume }}</div>
        <v-text-field
          v-model="localOptions.minVolume"
          outlined
          class="mt-2"
          :label="`eg: ${options.defaultMinVolume}`"
          :placeholder="`eg: ${options.defaultMinVolume}`"
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
            <div>Default is : {{ options.defaultTabRecordingTimeout }}</div>
            <v-text-field
              v-model="localOptions.tapRecordingTimeout"
              outlined
              class="mt-2"
              :label="`eg: ${options.defaultTabRecordingTimeout}`"
              :placeholder="`eg: ${options.defaultTabRecordingTimeout}`"
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
    <v-card tile flat>
      <v-card-title class="d-block pb-2"> Button API </v-card-title>
      <v-card-text>
        This is a simple registration form where you can toggle password hidden
        state by your voice. Try saying ' <b>Show password</b> ' to view your
        password or ' <b>Hide password</b> ' to hide it again
      </v-card-text>
      <v-card-text>
        <v-text-field
          ref="form-username"
          label="Username"
          hint="Please use a unique name"
          persistent-hint
          value=""
          outlined
          class="mb-4"
        ></v-text-field>
        <v-text-field
          ref="form-password"
          label="Password"
          hint="Must be strong to prevent hackers from accessing your private data"
          persistent-hint
          value="12345678"
          outlined
          :type="api.hidePassword ? 'password' : 'text'"
          :append-icon="`mdi-eye${api.hidePassword ? '-off' : ''}`"
          @click:append="api.hidePassword = !api.hidePassword"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-card tile flat>
      <v-card-title class="d-block pb-2"> Form Stepper API </v-card-title>
      <v-card-text>
        <div>
          Multi-Step registration form API using VoiceOn. Try saying '
          <b>Next step</b> ' to go forward in the steps or '
          <b>Previous step</b> ' to go back
        </div>
        <v-divider class="my-1"></v-divider>
        <div>
          You can also focus on input fields by saying '
          <b>Form + {Field name}</b> '. For example, to complete all fields
          using your voice only, Say ' <b>Form first name</b> ' to focus on the
          first name filed, then say ' <b>{Your name}</b> ', You'll find '
          <b>{Your name}</b> ' is written automatically into the first name
          field
        </div>
        <v-divider class="my-1"></v-divider>
        For toggling buttons like ' <b>Gender</b> ', Say '
        <b>Form gender {Your gender}</b> ' to select your gender
      </v-card-text>
      <v-card-text>
        <v-stepper v-model="api.step" alt-labels>
          <v-stepper-header>
            <v-stepper-step :step="1"> Basic infomation </v-stepper-step>
            <v-stepper-step :step="2"> Credentials </v-stepper-step>
            <v-stepper-step :step="3"> Accept terms </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :step="1">
              <div class="secondary--text font-weight-medium mb-2">
                Your name
              </div>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    ref="form-first-name"
                    hide-details
                    filled
                    label="First name"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    ref="form-last-name"
                    hide-details
                    filled
                    label="Last name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="secondary--text font-weight-medium mb-2">
                    Gender
                  </div>
                  <v-btn-toggle v-model="form.gender" class="w-full">
                    <v-btn
                      class="w-50 font-weight-bold px-8"
                      outlined
                      active-class="primary--text"
                      value="male"
                    >
                      Male
                    </v-btn>
                    <v-btn
                      value="female"
                      class="w-50 font-weight-bold px-8"
                      outlined
                      active-class="pink--text"
                    >
                      Female
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content :step="2">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    ref="form-phone-number"
                    filled
                    label="Phone number"
                    prepend-inner-icon="mdi-phone"
                    hint="We'll send you a verification code to confirm your phone number"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    ref="form-verification-code"
                    filled
                    label="Verification code"
                    prepend-inner-icon="mdi-lock-outline"
                    hint="Use the verification code you just recieved from VoiceOn"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content :step="3">
              <div style="height: 300px; overflow-y: scroll">
                <div class="fs-10 secondary--text font-weight-medium">
                  VoiceOn user agreement
                </div>
                <v-divider class="my-3"></v-divider>
                <div class="my-2 secondary--text font-weight-medium">
                  Rule One
                </div>
                <div>
                  Ipsum non in qui cupidatat ipsum. Voluptate occaecat ea
                  proident ad sit laborum nulla tempor eu do commodo. Fugiat
                  Lorem esse ex cillum veniam. Lorem dolor pariatur
                  reprehenderit ut eiusmod sint aliquip irure occaecat ipsum
                  duis nostrud occaecat. Occaecat nostrud commodo laboris amet
                  commodo cillum tempor tempor officia culpa officia deserunt.
                  Tempor laboris do nisi labore officia duis.
                </div>
                <div class="my-2 secondary--text font-weight-medium">
                  Rule Two
                </div>
                <div>
                  Mollit elit aliquip aliqua dolore adipisicing amet sunt ad ut.
                  Laborum proident occaecat laborum in excepteur mollit
                  cupidatat labore adipisicing labore aute ex anim. Irure
                  incididunt aliquip proident voluptate mollit incididunt ipsum
                  ex pariatur commodo mollit ipsum consectetur nisi. Non tempor
                  duis pariatur quis. Ullamco fugiat exercitation sit quis.
                </div>
                <div class="my-2 secondary--text font-weight-medium">
                  Rule Three
                </div>
                <div>
                  Elit excepteur et occaecat excepteur occaecat aliqua in
                  pariatur pariatur. Aliqua incididunt fugiat nisi magna id.
                  Pariatur enim et commodo non est aliquip aliquip magna. Ut
                  nostrud veniam excepteur Lorem ea sint velit dolore Lorem
                  cillum. Reprehenderit sit exercitation aliqua ipsum aliquip
                  sint aute nisi excepteur deserunt est voluptate proident enim.
                </div>
                <div class="my-2 secondary--text font-weight-medium">
                  Rule Four
                </div>
                <div>
                  Lorem aliquip sunt tempor dolor nisi dolore sit laboris ipsum
                  cupidatat aliqua nostrud nostrud ut. Est nisi exercitation
                  nulla deserunt adipisicing aliqua sit amet officia incididunt.
                  Quis laborum esse consequat Lorem fugiat ex pariatur mollit
                  amet.
                </div>
              </div>
              <v-divider class="mb-1 mt-4"></v-divider>
              <div>
                <v-checkbox
                  v-model="form.terms"
                  label="I've read and accepted VoiceOn terms and conditions"
                  hint="0"
                  persistent-hint
                >
                  <template #message>
                    <div class="lh-1-5">
                      To accept terms using your voice, Please say '
                      <b>Form terms accept</b> '. To uncheck the accept
                      checkbox, Please say ' <b>Form terms refuse</b> '
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </v-stepper-content>
            <v-stepper-content :step="4">
              <v-sheet height="300" color="transparent">
                <v-layout
                  align-center
                  justify-center
                  align-content-center
                  fill-height
                >
                  <div class="text-center">
                    <div class="mb-4">
                      <v-avatar
                        color="blue lighten-5"
                        size="80"
                        style="overflow: visible"
                      >
                        <v-icon
                          color="primary"
                          size="80"
                          style="transform: translate(15px, -10px)"
                          >mdi-check-all</v-icon
                        >
                      </v-avatar>
                    </div>
                    <div class="mb-1 secondary--text font-weight-medium">
                      You are all set
                    </div>
                    <div>Your account on VoiceOn is ready</div>
                  </div>
                </v-layout>
              </v-sheet>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-btn
          class="px-6"
          large
          outlined
          :disabled="api.step < 2"
          @click="api.step > 1 ? api.step-- : () => {}"
        >
          <v-icon class="me-2">mdi-keyboard-backspace</v-icon>
          Previous
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="px-6 raised"
          large
          color="primary"
          outlined
          :disabled="api.step > 3"
          @click="api.step < 4 ? api.step++ : () => {}"
        >
          Next
          <v-icon class="ms-2">mdi-keyboard-backspace mdi-rotate-180</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card tile flat class="mt-4">
      <v-card-title class="d-block pb-2"> Text to Speech API </v-card-title>
      <v-card-text>
        <div class="mb-2">
          Write any text you wanna listen to, Hit the button below to let
          <b>VoiceOn</b>
          analyze your text and converts it into audio voice
        </div>
        <div>
          <v-textarea
            v-model="form.textToSpeech"
            filled
            label="Text"
            counter="500"
            hint="Max characters for now is: 500"
            persistent-hint
          ></v-textarea>
        </div>
        <div class="mt-4">
          <v-btn
            class="px-6 white--text"
            large
            :color="'#00c9a7'"
            :disabled="form.textToSpeech.trim().length > 500"
            @click="localTextToSpeech()"
          >
            <v-icon class="me-2">mdi-play</v-icon>
            Convert to voice
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-card tile flat class="mt-4">
      <v-card-title class="d-block pb-2"> Speech to text API </v-card-title>
      <v-card-text>
        <div>
          Hit the button below and start talking, when you finish, Hit the
          button again to let <b>VoiceOn</b>
          analyze your speech and converts it into text
        </div>
        <div class="my-4">
          <v-divider class="my-1"></v-divider>
          <div class="mb-2 font-weight-bold">
            Converted Text will show below
          </div>
          <div>
            {{ speechToTextObj.text }}
          </div>
          <v-divider class="my-1"></v-divider>
        </div>
        <div class="mt-4">
          <v-btn
            class="px-6 white--text"
            large
            :color="speechToTextObj.recording ? 'error' : '#00c9a7'"
            :disabled="speechToTextObj.transcripting"
            @click="
              speechToTextObj.recording
                ? localSpeechToText().stop(true)
                : speechToTextObj.transcripting
                ? () => {}
                : localSpeechToText().start()
            "
          >
            <v-icon class="me-2"
              >mdi-{{ speechToTextObj.recording ? 'stop' : 'play' }}</v-icon
            >
            {{ speechToTextObj.recording ? 'Stop' : 'Start' }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-card tile flat class="mt-4">
      <v-card-title class="d-block pb-2"> Get news API </v-card-title>
      <v-card-text>
        <div>
          Try saying ' <b>What's the news</b> ' or <b>Tell me the news</b>.
          <div>
            <b>VoiceOn</b> will reply with a female voice telling you the news
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card tile flat class="mt-4">
      <v-card-title class="d-block pb-2"> Get time API </v-card-title>
      <v-card-text>
        <div>
          Try saying ' <b>What time is it</b> ' or <b>Tell me the time</b>.
          <div>
            <b>VoiceOn</b> will reply with a female voice telling you the
            current time
          </div>
        </div>
      </v-card-text>
    </v-card>
    <!-- Modals -->
    <v-dialog v-model="modals.login" persistent max-width="450">
      <v-card>
        <v-card-title>
          Login Modal
          <v-spacer></v-spacer>
          <v-btn icon @click="modals.login = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          WoW, I'm opened by your voice. You can close me by saying 'Hide Modal'
          or by clicking the top right close button
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modals.register" persistent max-width="450">
      <v-card>
        <v-card-title> Register Modal </v-card-title>
        <v-card-text>
          WoW, I'm opened by your voice. You can only close me by your voice,
          Try saying 'Hide Modal' and can't be closed by other ways unlike the
          login modal.
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ../Modals -->
    <transcribe-speech @run-command="runCommand"></transcribe-speech>
  </div>
</template>

<script>
export default {
  components: {
    TranscribeSpeech: () =>
      import('~/components/playground/TranscribeSpeech.vue'),
  },
  layout: 'playground',
  data: () => ({
    modals: {
      login: false,
      register: false,
    },
    api: {
      hidePassword: true,
      step: 1,
    },
    recorder: null,
    stream: null,
    audioContext: null,
    mediaStreamSource: null,
    speechToTextObj: {
      recording: false,
      transcripting: false,
      intval: null,
      text: '',
    },
    form: {
      'first-name': '',
      'last-name': '',
      gender: null,
      terms: false,
      textToSpeech: '',
    },
    localOptions: {
      listenSeconds: 3000,
      hasTapRecordingTimeout: false,
      tapRecordingTimeout: 3000,
      minVolume: 0.12,
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
    setTimeout(this.setDefaultOptions, 1000)
  },
  methods: {
    runCommand({ command, slots, tokens }) {
      switch (command) {
        case 'OpenModal':
          this.$set(this.modals, slots.name, true)
          break
        case 'HideModal':
          this.$set(this.modals, slots.name, false)
          break
        case 'HideAnyModal':
          Object.keys(this.modals).forEach((modal) => {
            this.$set(this.modals, modal, false)
          })
          break
        case 'ShowHidePassword':
          this.$set(this.api, 'hidePassword', slots.action === 'hide')
          break
        case 'FormStepper':
          this.$set(
            this.api,
            'step',
            this.api.step + 1 * (slots.action === 'next' ? 1 : -1)
          )
          break
        case 'FocusOnFormInput':
          {
            const { name, decision } = slots
            if (decision) {
              if (['accept', 'refuse'].includes(decision)) {
                this.$set(this.form, name, decision === 'accept')
              } else {
                this.$set(this.form, name, decision)
              }
            } else {
              const el = this.$refs[`form-${name}`]
              if (el) {
                const input = el.$el.querySelector(
                  'input:not([type=hidden]),textarea:not([type=hidden])'
                )
                if (input) {
                  setTimeout(() => {
                    input.focus()
                  }, 0)
                }
              }
            }
          }
          break
      }
    },
    localSpeechToText() {
      const $this = this
      return {
        async start() {
          $this.$set($this.speechToTextObj, 'recording', true)
          const permission = await $this.getMicrophonePermission()
          if (permission === true) {
            $this.recorder.record()
            $this.speechToTextObj.intval = setInterval(() => {
              $this.localSpeechToText().stop()
            }, 2000)
          }
        },
        stop(permanently = false) {
          if (permanently) {
            clearInterval($this.speechToTextObj.intval)
            $this.$set($this.speechToTextObj, 'recording', false)
            $this.recorder.stop()
            $this.stream.getAudioTracks()[0].stop()
          }
          $this.recorder.exportWAV(async (blob) => {
            const text = await $this.speechToText(blob)
            const prevText = `${$this.speechToTextObj.text} ${text}`
            $this.$set($this.speechToTextObj, 'text', prevText)
          })
        },
      }
    },
    getMicrophonePermission() {
      return new Promise((resolve, reject) => {
        if (
          this.audioContext &&
          this.stream &&
          this.mediaStreamSource &&
          this.recorder
        ) {
          resolve(true)
        }
        const $this = this
        this.audioContext = new AudioContext()
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            $this.$set($this, 'stream', stream)
            $this.mediaStreamSource =
              $this.audioContext.createMediaStreamSource(stream)
            // eslint-disable-next-line no-undef
            $this.recorder = new Recorder($this.mediaStreamSource)
            resolve(true)
          })
      })
    },
    stopMicAccess() {
      if (this.stream) {
        this.stream.getAudioTracks()[0].stop()
      }
    },
    localTextToSpeech() {
      const text = this.form.textToSpeech
      if (text.trim().length > 500) {
        return
      }
      this.textToSpeech({
        text,
      })
    },
    setDefaultOptions() {
      const options = { ...this.options }
      Object.keys(options).forEach((key) => {
        this.$set(this.localOptions, key, options[key])
      })
    },
  },
}
</script>
