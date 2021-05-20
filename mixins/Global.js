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
  changeTheme(v) {
    this.$set(this.$vuetify.theme, 'dark', v)
    this.$ls.set('voiceon-dark-theme', v)
  },
  switchLang() {
    const lang = this.$i18n.locale === 'ar' ? 'en' : 'ar'
    const r = this.switchLocalePath(lang)
    window.location.href = r
  },
  changeLang(lang) {
    this.$router.push(this.switchLocalePath(lang))
  },
  setDefaults() {
    const lang = this.$i18n.locale
    const darkTheme = this.$ls.get('voiceon-dark-theme', 'false')
    this.$set(this.$vuetify.lang, 'current', lang)
    this.$set(this.$vuetify, 'rtl', lang === 'ar')
    const intval = setInterval(() => {
      clearInterval(intval)
      this.$set(this.$vuetify.theme, 'dark', darkTheme === 'true')
    }, 1000)
  },
}
