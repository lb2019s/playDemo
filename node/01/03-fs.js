const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
// const data = fs.readFileSync('./conf.js')
// console.log(data.toString());

// fs.readFile('./conf.js', (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })

readFile('./conf.js').then(data => {
    console.log(data.toString());
})