const fs = require('fs')

let rd = fs.createReadStream('./1.jpg')
let we = fs.createWriteStream('./2.jpg')

rd.pipe(we)