const fs = require('fs')
const path = require('path')

const dirPath = 'test'

console.log(fs.readdirSync(dirPath), fs.existsSync(dirPath))