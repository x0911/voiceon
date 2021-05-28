// const host = '209.97.154.255:12101'
const host = 'voice.mmw.pw:12101'
const textToSpeechHost = 'tts.mmw.pw:5543'
module.exports = {
  host,
  href: `https://${host}/`,
  wsURL: `wss://${host}`,
  textToSpeech: {
    host: textToSpeechHost,
    href: `https://${textToSpeechHost}/`,
    wsURL: `wss://${textToSpeechHost}`,
  },
}
