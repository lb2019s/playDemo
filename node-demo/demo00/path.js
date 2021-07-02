const path = require('path')
const notes = 'package.json'
console.log(path.dirname(notes))
console.log(path.basename(notes))
console.log(path.basename(notes, path.extname(notes)))
console.log(path.basename(notes, '.js'))
console.log(path.extname(notes))
console.log(path.resolve(notes))
console.log(path.parse('./test/test.txt'))