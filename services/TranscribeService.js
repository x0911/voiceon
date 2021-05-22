import Api from '@/services/Api'

export default {
  transcribeWav(wavData, sendHass) {
    const params = {}
    if (!sendHass) {
      params.nohass = true
    }

    return Api().post('api/speech-to-intent', wavData, {
      params,
      headers: { 'Content-Type': 'audio/wav' },
    })
  },

  getIntent(sentence, sendHass) {
    const params = {}
    if (!sendHass) {
      params.nohass = true
    }

    return Api().post('api/text-to-intent', sentence, {
      params,
      headers: { 'Content-Type': 'text/plain' },
    })
  },

  startRecording() {
    return Api().post('api/start-recording', '')
  },

  stopRecording(sendHass) {
    const params = {}
    if (!sendHass) {
      params.nohass = true
    }

    return Api().post('api/stop-recording', '', {
      params,
    })
  },

  playRecording() {
    return Api().post('api/play-recording', '')
  },

  wakeup() {
    return Api().post('api/listen-for-command')
  },
}
