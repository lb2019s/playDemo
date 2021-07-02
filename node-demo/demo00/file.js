const fs = require('fs')

console.log(fs.access('./test/1.txt', (err, data) => {
    console.log(data)
}))
fs.open('./package.json', 'r', (err, fd) => {
    console.log(fd)
})
fs.stat('./package.json', (err, stat) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(stat.isFile())
    console.log(stat.isDirectory())
    console.log(stat.isSymbolicLink())
    console.log(stat.size)
})

fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data, typeof data)
})
fs.writeFile('./test/1.txt', '一些内容\n', err => {
    if (err) {
        console.log(err)
    }
})
fs.appendFile('./test/1.txt', '二些内容\n', err => {
    if (err) {
        console.log(err)
    }
})
