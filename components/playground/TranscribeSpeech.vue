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
          <!-- v-show="
              !options.continuousMode ||
              doCommands ||
              tapRecording ||
              errors.intentSocket
            " -->
          <v-btn
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
            <client-only v-if="timerEndTime && timerEndTime > 0">
              <vac :end-time="timerEndTime">
                <template #process="{ timeObj }">
                  <span class="fs-14">
                    {{ timeObj.s }}
                  </span>
                </template>
              </vac>
            </client-only>
            <v-img
              v-else-if="doCommands || tapRecording"
              :src="require('@/assets/media/svg/circle-pulse.svg')"
            ></v-img>
            <v-icon
              v-else
              v-text="
                errors.intentSocket ? 'mdi-exclamation-thick' : 'mdi-microphone'
              "
            ></v-icon>
            <div
              class="font-weight-bold fs-9"
              style="
                position: absolute;
                top: 0;
                right: 80px;
                color: red;
                user-select: none;
                pointer-events: none;
              "
            >
              <v-slide-x-reverse-transition>
                <div v-if="showLastCommand">
                  {{
                    commands && commands.length > 0
                      ? commands[commands.length - 1]
                      : ''
                  }}
                </div>
              </v-slide-x-reverse-transition>
            </div>
          </v-btn>
        </template>
        <span> Error connecting to our servers </span>
      </v-tooltip>
    </v-fab-transition>
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
    showLastCommand: false,
    errors: {
      intentSocket: false,
    },
    timerEndTime: null,
    // Audio Visual
    // audioContext = null, // Used above
    stream: null,
    mediaStreamSource: null,
    meter: null,
    canvasContext: null,
    WIDTH: 500,
    HEIGHT: 50,
    rafID: null,
    volume: 0,
    volumesInSession: [],
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
          this.stopMicAccess()
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
    getMicrophonePermission() {
      this.$set(this, 'audioContext', null)
      this.$set(this, 'mediaStreamSource', null)
      this.$set(this, 'recorder', null)
      this.$set(this, 'meter', null)
      return new Promise((resolve, reject) => {
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
            // eslint-disable-next-line no-undef
            $this.meter = createAudioMeter($this.audioContext)
            $this.mediaStreamSource.connect($this.meter)
            $this.drawLoop()
            resolve(true)
          })
      })
    },
    drawLoop() {
      // Can pass 'time' as an optional parameter
      if (this.meter) {
        if (this.meter.checkClipping()) {
          // Very loud sound
        }
        this.$set(this, 'volume', this.meter.volume)
        this.$set(
          this.volumesInSession,
          this.volumesInSession.length,
          this.meter.volume
        )
        this.rafID = window.requestAnimationFrame(this.drawLoop)
      }
    },
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
        case 'GetNews':
          this.textToSpeech({
            text: 'Chelsea FC won the champions league',
          })
          break
        case 'GetTime':
          {
            const time = this.formatAMPM(new Date())
            this.textToSpeech({
              text: `It's ; ${time}`,
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
        clearInterval(this.listenInterval)
        this.stopRecording()
        // setTimeout(this.startRecording, 100)
      }, listenSeconds)
    },
    handleCommand(r) {
      const {
        // text,
        tokens,
        slots,
        // raw_text,
        // raw_tokens,
        intent: { name: command },
      } = r.data
      // if (
      //   (this.doCommands || !this.options.continuousMode) &&
      //   command !== 'WakeCommand'
      // ) {
      // this.$set(this.commands, this.commands.length, text)
      this.$set(this, 'doCommands', false)
      this.runCommand(command, slots, tokens)
      // }
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
      if (this.options.continuousMode) {
        this.listen()
      }
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
    pushCommand(text) {
      this.$set(this, 'showLastCommand', true)
      this.$set(this.commands, this.commands.length, text)
      setTimeout(() => {
        this.$set(this, 'showLastCommand', false)
      }, 2000)
    },
    stopMicAccess() {
      if (this.stream) {
        this.stream.getAudioTracks()[0].stop()
      }
    },
    stopRecording() {
      this.recorder.stop()
      let laudEnough = true
      if (this.options.continuousMode) {
        const volumesSession = [...this.volumesInSession]
        const getAverage = (arr) => arr.reduce((a, b) => a + b) / arr.length
        const average = getAverage(volumesSession)
        const minVolume = this.options.minVolume / 100
        laudEnough = average >= minVolume
      } else {
        this.stopMicAccess()
      }
      this.setTimerEndTime(0, true)
      // Export recording data
      const that = this
      that.$set(that, 'interpreting', true)
      this.recorder.exportWAV(function (blob) {
        that.beginAsync()
        TranscribeService.transcribeWav(blob, that.sendHass)
          .then((request) => {
            // const confidence = request.data.speech_confidence
            if (laudEnough) {
              console.log(request.data)
              that.pushCommand(request.data.text)
            }
            if (
              request.data.intent.name.length > 0 &&
              (that.options.continuousMode || that.tapRecording)
            ) {
              if (laudEnough) {
                that.handleCommand(request)
              }
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
        // const text = await that.speechToText(blob)
        // const prevText = that.$store.state.options.speechToText + ' | ' + text
        // that.$store.commit('options/speechToText', prevText)
      })
    },
    setTimerEndTime(seconds, resetVolumesSession = false) {
      this.$set(
        this,
        'timerEndTime',
        seconds > 0 ? Number(new Date().getTime() + Number(seconds)) : null
      )
      if (resetVolumesSession) {
        this.$set(this, 'volumesInSession', [])
      }
    },
    async startRecording() {
      if (this.options.continuousMode) {
        this.setTimerEndTime(this.options.listenSeconds, true)
      } else if (this.options.hasTapRecordingTimeout) {
        this.setTimerEndTime(this.options.tapRecordingTimeout)
      } else {
        this.setTimerEndTime(0)
      }
      const permission = await this.getMicrophonePermission()
      if (permission === true) {
        this.recorder.clear()
        this.recorder.record()
      } else {
        console.log('Need permission to access Microphone')
      }
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
