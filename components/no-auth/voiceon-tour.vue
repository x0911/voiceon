<template>
  <div>
    <v-dialog v-model="model" persistent max-width="800" scrollable>
      <v-card>
        <v-card-title>
          How VoiceOn works?
          <v-spacer></v-spacer>
          <v-btn icon @click="endTour()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-list class="px-0 mx-0">
                <template v-for="(step, i) in steps">
                  <v-list-item :key="i" class="wrap">
                    <v-list-item-icon>
                      <v-slide-x-transition group hide-on-leave>
                        <v-icon
                          v-if="currentStep > i"
                          key="checked"
                          color="#00c9a7"
                        >
                          mdi-check-all
                        </v-icon>
                        <v-icon v-else key="unchecked" color="grey lighten-2">
                          mdi-check-all
                        </v-icon>
                      </v-slide-x-transition>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ step.list.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ step.list.subtitle }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-col>
            <v-col cols="auto">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col style="position: relative">
              <v-btn
                data-v-step="0"
                fab
                absolute
                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
                x-large
                color="#00c9a7"
                class="white--text"
              >
                <v-icon>mdi-microphone-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-tour name="voiceon-tour" :steps="steps"></v-tour>
  </div>
</template>

<script>
import TranscribeService from '@/services/TranscribeService'
export default {
  data() {
    const $this = this
    return {
      model: false,
      currentStep: 0,
      steps: [
        {
          list: {
            title: 'What is Command Button?',
            subtitle: "It's the button controlling VoiceOn listening status",
          },
          target: '[data-v-step="0"]',
          header: {
            title: 'Command Button',
          },
          content: `This button will always be in the center of the screen, but you can change it's position from Settings.`,
          before: (type) =>
            new Promise((resolve, reject) => {
              $this.stepUp(0)
              resolve(true)
            }),
        },
        {
          list: {
            title: 'How can I use Command Button?',
            subtitle:
              'Click it to start giving commands, Click again to let VoiceOn analyze your commands and do them',
          },
          target: '[data-v-step="0"]',
          header: {
            title: 'Command Button',
          },
          content:
            "Use this button to toggle VoiceOn listening status, We don't spy on your microphone, so we only start listening upon your order",
          before: (type) =>
            new Promise((resolve, reject) => {
              $this.stepUp(1)
              resolve(true)
            }),
        },
        {
          list: {
            title: 'Start a command',
            subtitle:
              'Click the button and try saying " Hide Modal " to hide this modal, " Start again " to restart the tutorial, or " Run playground " to view the playground page ',
          },
          target: '[data-v-step="1"]',
          content: '',
          params: {
            placement: 'top',
          },
          before: (type) =>
            new Promise((resolve, reject) => {
              $this.stepUp(2)
              resolve(true)
            }),
        },
        {
          list: {
            title: 'Finish the command',
            subtitle:
              'Click the button again to stop the command listener, and begin analyzing the commiting your command',
          },
          target: '[data-v-step="1"]',
          content: '',
          params: {
            placement: 'top',
          },
          before: (type) =>
            new Promise((resolve, reject) => {
              $this.stepUp(3)
              resolve(true)
            }),
        },
      ],
      loading: false,
      intentSocket: null,
      jsonSource: null,
      sentence: '',
      tapRecording: false,
      recorder: null,
      interpreting: false,
      sendHass: false,
      audioContext: null,
      doCommands: false,
      listenInterval: null,
      commands: [],
      errors: {
        intentSocket: false,
      },
    }
  },
  mounted() {
    this.connectIntentSocket()
    // this.startTour()
  },
  methods: {
    stepUp(nextStep) {
      // const length = this.steps.length
      this.$set(this, 'currentStep', nextStep)
    },
    startTour() {
      this.$set(this, 'model', true)
      this.$set(this, 'currentStep', 0)
      setTimeout(this.$tours['voiceon-tour'].start, 1000)
    },
    endTour() {
      this.$set(this, 'model', false)
      this.$tours['voiceon-tour'].finish()
    },
    runCommand(command, slots, tokens) {
      switch (command) {
        case 'RestartLandingPageTutorial':
          this.startTour()
          break
        case 'HideAnyModal':
          this.endTour()
          break
      }
    },
    handleCommand(r) {
      const {
        tokens,
        slots,
        intent: { name: command },
      } = r.data
      if (this.doCommands) {
        this.runCommand(command, slots, tokens)
      }
    },
    beginAsync() {
      this.$set(this, 'loading', true)
    },
    endAsync() {
      this.$set(this, 'loading', false)
    },
    toggleRecording() {
      if (this.tapRecording) {
        this.stopRecording()
      } else {
        this.$set(this, 'tapRecording', true)
        this.startRecording()
      }
    },
    stopRecording() {
      this.recorder.stop()
      // Export recording data
      const that = this
      that.$set(that, 'interpreting', true)
      this.recorder.exportWAV(function (blob) {
        that.beginAsync()
        TranscribeService.transcribeWav(blob, that.sendHass)
          .then((request) => {
            // const confidence = request.data.speech_confidence
            // console.log(request.data)
            if (
              request.data.intent.name.length > 0 &&
              (that.options.continuousMode || that.tapRecording)
            ) {
              that.$set(that, 'tapRecording', false)
              that.handleCommand(request)
            } else {
              that.$set(that, 'doCommands', false)
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .then(() => {
            that.$set(that, 'tapRecording', false)
            that.$set(that, 'interpreting', false)
            that.endAsync()
          })
      })
    },
    async startRecording() {
      const permission = await this.getMicrophonePermission()
      if (permission === true) {
        this.recorder.clear()
        this.recorder.record()
      } else {
        console.log('Need permission to access Microphone')
      }
    },
    getMicrophonePermission() {
      // Request microphone permissions
      return new Promise((resolve, reject) => {
        if (this.audioContext == null) {
          this.audioContext = new AudioContext()
        }
        if (this.recorder == null) {
          const that = this
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
              const input = that.audioContext.createMediaStreamSource(stream)
              // eslint-disable-next-line no-undef
              that.recorder = new Recorder(input)
              resolve(true)
            })
        } else {
          resolve(true)
        }
      })
    },
    connectIntentSocket() {
      const { wsURL: url } = require('@/assets/api-url.js')
      const wsURL = url + '/api/events/intent'
      this.intentSocket = new WebSocket(wsURL)
      this.intentSocket.onmessage = (evt) => {
        this.$set(this, 'jsonSource', JSON.parse(evt.data))
        this.$set(this, 'sentence', this.jsonSource.raw_text)
      }
      this.intentSocket.onerror = () => {
        this.$set(this.errors, 'intentSocket', true)
      }
      this.intentSocket.onclose = () => {
        // Try to reconnect
        setTimeout(this.connectIntentSocket, 1000)
      }
    },
  },
}
</script>
