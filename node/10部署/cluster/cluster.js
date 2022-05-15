const cluster = require('cluster')
const os = require('os')
const numsCpus = os.cpus().length
const process = require('process')

const workers = {}
if (cluster.isMaster) {
    console.log('cpus', numsCpus)
    for (let i = 0; i < numsCpus; i++) {
        const worker = cluster.fork()
        console.log('init ... pid', worker.process.pid);
        workers[worker.process.pid] = worker
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('工作进程 %d 关闭 (%s)，重启中。。', worker.process.pid, signal || code);
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    })
} else {
    const app = require('./app')
    app.listen(3000, () => {

    })
}

process.on('SIGTERM', () => {
    for (let pid in workers) {
        process.kill([pid])
    }
    process.exit(0)
})

require('./test')