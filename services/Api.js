import axios from 'axios'
const { href: wsHref } = require('@/assets/api-url.js')
export default () => {
  const options = {
    baseURL: wsHref,
  }
  return axios.create(options)
}
