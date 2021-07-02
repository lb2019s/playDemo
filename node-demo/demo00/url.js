const url = require('url')

const URL = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

console.log(url.parse(URL))
console.log(url.parse(URL, true))