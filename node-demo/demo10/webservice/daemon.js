const cp = require('child_process')

let worker

function spawn(server, config) {
    worker = cp.spawn('node', [ server, config ])
    worker.on('exit', code => {
        if (code !== 0) {
            spawn(server, config)
        }
    })
}

function main(argv) {
    spawn('serverPro.js', argv[0])
    process.on('SIGTEAM', () => {
        worker.kill()
        process.exit(0)
    })
}

main(process.argv.slice(2))