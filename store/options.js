export const state = {
  rhasspy: {
    continuousMode: false,
  },
}

export const mutations = {
  toggleContinuousMode(state) {
    state.rhasspy.continuousMode = !state.rhasspy.continuousMode
  },
}
