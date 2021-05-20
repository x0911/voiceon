module.exports = {
  api(params = {}, user = {}) {
    const queryStringifier = require('query-string')
    const axios = require('axios')
    params.refreshToken = params.refreshToken
      ? params.refreshToken
      : this.$store
      ? this.$store.state.user?.refreshToken
      : user?.refreshToken
    params.uid = params.uid
      ? params.uid
      : this.$store
      ? this.$store.state.user?.uid
      : user?.uid
    Object.keys(params).forEach((key) => {
      const val = params[key]
      if (Array.isArray(val)) {
        params[key] = val.join('||-_-||-_-||')
      } else if (val === undefined) {
        params[key] = null
      }
    })
    return new Promise((resolve, reject) => {
      const hosts = {
        local: 'http://localhost/',
        hostednetwork: 'http://192.168.137.1/',
        remote: 'https://trnmnts.000webhostapp.com/', // OLD: https://trnmnts.rf.gd/
        use: 'local',
      }
      const queryString = queryStringifier.stringify(params)
      axios
        .post(hosts[hosts.use], queryString, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((x) => {
          if (x && x.data && x.data.errors_count && x.data.errors_count > 0) {
            delete x.data.errors
            reject(x.data)
          } else {
            resolve(x.data)
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },
}
