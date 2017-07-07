let axios = require('axios')
axios.defaults.headers = {
  'content-type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]
let commonJS = {}
commonJS.install = function (Vue) {
  Vue.prototype.$axios = axios
}
module.exports = commonJS
