export const state = () => ({
  rhasspy: {
    continuousMode: false,
    listenSeconds: 2000,
    hasTapRecordingTimeout: false,
    tapRecordingTimeout: 2000,
  },
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
    }
  },
}
