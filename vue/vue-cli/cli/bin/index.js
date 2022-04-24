#!/usr/bin/env node
const webpack = require('webpack')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')
const utils = require('util')

const webpackConfig = require('../webpack.config')
const args = minimist(process.argv.slice(2))
console.log(args)


const __commands = {}
const api = {
    registerCommand(name, impl) {
        const command = __commands[name]
        if (!command) {
            __commands[name] = impl
        }
    }
}

const runBuildWebpack = () => {
    webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log('build error')
            return
        }
        console.log('build success')
    })
}

const fname = 'mm.config.js'
const readLocationOptions = () => new Promise((resolve, reject) => {
    const config = require(path.resolve(process.cwd(), fname))
    const { plugins: { commands = [] } } = config || {}
    if (commands.length) {
        commands.forEach(command => command(api))
    }
    resolve(__commands)
})

readLocationOptions().then((commands) => {
    const argv = args._[0]
    if (commands[argv]) {
        commands[argv]()
    } else {
        runBuildWebpack()
    }
})
