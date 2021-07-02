const child_process = require('child_process')
const util = require('util')

function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s %s', source, target),
        callback
    )
}

function main(argv) {
    copy(argv[0], argv[1], (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('复制成功')
    })
}

main(process.argv.slice(2))