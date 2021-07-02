const fs = require('fs')
fs.mkdir('./test', err => {
    
})
try {
    fs.writeFileSync('./test/1.txt', '一些事情')
} catch (e) {
    console.error(e)
}