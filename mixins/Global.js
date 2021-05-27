module.exports = {
  ucFirst($text) {
    const ucfirst = $text
      .replace('_', ' ')
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
    return ucfirst
  },
  setLoading(state = true) {
    this.$nextTick(() => {
      if (state) {
        this.$nuxt.$loading.start()
        const intval = setInterval(() => {
          this.$nuxt.$loading.finish()
          clearInterval(intval)
        }, 5000)
      } else {
        const intval = setInterval(() => {
          this.$nuxt.$loading.finish()
          clearInterval(intval)
        }, 500)
      }
    })
  },
  pushRoute(r) {
    this.$nextTick(() => {
      this.$router.push(r)
    })
  },
  isEmail(v) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      v
    )
  },
  formatAMPM(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours && hours > 0 ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  },
  changeTheme(v) {
    this.$set(this.$vuetify.theme, 'dark', v)
    this.$ls.set('voiceon.dark-theme', v)
  },
  setDefaults() {
    const voiceonOptions = this.$ls.get('voiceon.options', null)
    this.$store.commit('options/setDefaultValues', voiceonOptions)
    const darkTheme = this.$ls.get('voiceon.dark-theme', 'false')
    const intval = setInterval(() => {
      clearInterval(intval)
      this.$set(this.$vuetify.theme, 'dark', darkTheme === 'true')
    }, 1000)
  },
}
