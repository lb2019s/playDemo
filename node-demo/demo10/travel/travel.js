const { fstat } = require("fs");

const fs = require('fs')
const path = require('path')

function travel(dir, callback) {
    fs.readdirSync(dir).forEach((file) => {
        let pathname = path.join(dir, file)
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback)
        } else {
            callback(pathname)
        }
    })
}

travel('/Users/didi/Desktop/node-demo', (pathname) => {
    console.log(pathname)
})