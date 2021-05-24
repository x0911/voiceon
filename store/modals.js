export const state = () => ({
  login: false,
  register: false,
})

export const mutations = {
  toggleModal(state, name) {
    state[name] = !state[name]
  },
  hideModal(state, name) {
    state[name] = false
  },
  showModal(state, name) {
    state[name] = true
  },
}
