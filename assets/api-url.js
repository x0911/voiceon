// const host = '209.97.154.255:12101'
const host = 'voice.mmw.pw:12101'
const textToSpeechHost = '142.93.185.66:5500'
module.exports = {
  host,
  href: `https://${host}/`,
  wsURL: `wss://${host}`,
  textToSpeech: {
    host: textToSpeechHost,
    href: `http://${textToSpeechHost}/`,
    wsURL: `ws://${textToSpeechHost}`,
  },
}
