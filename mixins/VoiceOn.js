module.exports = {
  textToSpeech(params = {}) {
    const {
      textToSpeech: { href },
    } = require('@/assets/api-url.js')
    const axios = require('axios')
    const options = {
      baseURL: href,
    }
    axios
      .create(options)
      .get('api/tts', {
        params: {
          text: '',
          voice: 'nanotts:en-GB',
          cache: true,
          ...params,
        },
        responseType: 'blob',
      })
      .then((x) => {
        const audio = x.data
        const audioElement = document.getElementById('voiceon-audio-player')
        audioElement.src = URL.createObjectURL(audio)
        audioElement.play()
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
