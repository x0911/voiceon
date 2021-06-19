export const state = () => ({
  rhasspy: {
    continuousMode: false,
    listenSeconds: 3000,
    defaultListenSeconds: 3000,
    hasTapRecordingTimeout: false,
    tapRecordingTimeout: 3000,
    defaultTabRecordingTimeout: 3000,
    minVolume: 9,
    defaultMinVolume: 9,
  },
  speechToText: '',
})

export const mutations = {
  toggleContinuousMode(state) {
    state.rhasspy.continuousMode = !state.rhasspy.continuousMode
  },
  updatedRhasspyOptions(state, data) {
    if (data) {
      Object.keys(data).forEach((key) => {
        state.rhasspy[key] = data[key]
      })
      localStorage.setItem(`voiceon.options`, JSON.stringify(data))
    }
  },
  setDefaultValues(state, data) {
    if (data) {
      const jsonData = JSON.parse(data)
      Object.keys(jsonData).forEach((key) => {
        state.rhasspy[key] = jsonData[key]
      })
      state.rhasspy.continuousMode = false
    }
  },
  speechToText(state, text) {
    state.speechToText = text
  },
}
