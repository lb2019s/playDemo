const conf = require('./conf')
const { EventEmitter } = require('events')

const { MongoClient } = require('mongodb')

class MongoDB {
    constructor(conf) {
        this.conf = conf
        this.emitter = new EventEmitter()
        this.client = new MongoClient(conf.url)
        this.client.connect(err => {
            if (err) throw err
            console.log('连接成功');
            this.emitter.emit('connect')
        })

    }
    col(colName, dbName = this.conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }
    once(event, cb) {
        this.emitter.on(event, cb)
    }
}

module.exports = new MongoDB(conf)