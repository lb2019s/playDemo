const fs = require('fs')
const path = require('path')

const mongoose = require('mongoose')

const load = (dir, cb) => {
    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

const loadModal = conf => app => {
    mongoose.connect(conf.url, conf.options)
    app.$model = {}
    load('../model', (filename, { schema }) => {
        console.log('load model: ', filename, schema);
        const model = mongoose.model(filename, schema)
        app.$model[filename] = model
    })
}

module.exports = {
    loadModal
}