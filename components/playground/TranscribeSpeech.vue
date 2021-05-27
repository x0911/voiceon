<template>
  <div>
    <audio
      id="voiceon-audio-player"
      hidden
      class="d-none"
      autoplay="autoplay"
    ></audio>
    <v-fab-transition>
      <v-tooltip :disabled="!errors.intentSocket" top>
        <template #activator="{ on, attrs }">
          <v-btn
            v-show="
              !options.continuousMode ||
              doCommands ||
              tapRecording ||
              errors.intentSocket
            "
            :disabled="interpreting"
            :color="
              doCommands || tapRecording || errors.intentSocket
                ? 'error'
                : '#00c9a7'
            "
            fixed
            bottom
            right
            fab
            large
            class="white--text"
            style="z-index: 9999"
            v-bind="attrs"
            v-on="on"
            @click="
              options.continuousMode || errors.intentSocket
                ? () => {}
                : toggleRecording()
            "
          >
            <v-img
              v-if="doCommands || tapRecording"
              :src="require('@/assets/media/svg/circle-pulse.svg')"
            ></v-img>
            <v-icon
              v-else
              v-text="
                errors.intentSocket ? 'mdi-exclamation-thick' : 'mdi-microphone'
              "
            ></v-icon>
          </v-btn>
        </template>
        <span> Error connecting to our servers </span>
      </v-tooltip>
    </v-fab-transition>
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
  </div>
</template>

<script>
import TranscribeService from '@/services/TranscribeService'
export default {
  components: {},
  props: {},
  data: () => ({
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
    modals: {
      login: false,
      register: false,
    },
    errors: {
      intentSocket: false,
    },
  }),
  computed: {
    options() {
      return this.$store.state.options.rhasspy
    },
  },
  watch: {
    'options.continuousMode'(v) {
      if (!this.errors.intentSocket) {
        if (v === true) {
          this.listen()
        } else {
          clearInterval(this.listenInterval)
          this.stopRecording()
          this.$set(this, 'doCommands', false)
        }
      }
    },
  },
  mounted() {
    this.connectIntentSocket()
    if (this.options.continuousMode) {
      this.listen()
    }
  },
  methods: {
    runCommand(command, slots, tokens) {
      switch (command) {
        case 'NavigateBackward':
          this.$router.go(-1)
          break
        case 'NavigateTo':
          {
            const goTo = slots.name
            if (goTo.includes('home')) {
              this.$router.push('/')
            } else if (goTo.includes('playground')) {
              this.$router.push('/playground')
            } else if (goTo.includes('awesome page')) {
              this.$router.push('/playground/awesome')
            }
          }
          break
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
        case 'GetNews':
          this.textToSpeech({
            text: 'Hello; Here is the big news; The official FIFA World Cup Qatar 20 22 will be held on November',
          })
          break
        case 'GetTime':
          {
            const time = this.formatAMPM(new Date())
            this.textToSpeech({
              text: `Hello; Time now is; ${time}`,
            })
          }
          break
        default:
          this.$emit('run-command', { command, slots, tokens })
          break
      }
    },
    listen() {
      this.startRecording()
      const listenSeconds = this.options.listenSeconds
      this.listenInterval = setInterval(() => {
        this.stopRecording()
        setTimeout(this.startRecording, 100)
      }, listenSeconds)
    },
    handleCommand(r) {
      const {
        text,
        tokens,
        slots,
        // raw_text,
        // raw_tokens,
        intent: { name: command },
      } = r.data
      if (
        // (this.doCommands || !this.options.continuousMode) &&
        command !== 'WakeCommand'
      ) {
        this.$set(this.commands, this.commands.length, text)
        // this.$set(this, 'doCommands', false)
        this.runCommand(command, slots, tokens)
      }
      // if (command === 'WakeCommand' && this.options.continuousMode) {
      //   this.$set(this, 'doCommands', true)
      // }
      // console.log(r.data)
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
        if (this.options.hasTapRecordingTimeout) {
          const timeout = this.options.tapRecordingTimeout
          setTimeout(
            this.stopRecording,
            timeout && timeout > 0
              ? timeout
              : this.options.defaultTabRecordingTimeout
          )
        }
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
            console.log(request.data)
            if (
              request.data.intent.name.length > 0 &&
              (that.options.continuousMode || that.tapRecording)
            ) {
              that.handleCommand(request)
            } else {
              that.$set(that, 'doCommands', false)
            }
            that.$set(that, 'tapRecording', false)
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
