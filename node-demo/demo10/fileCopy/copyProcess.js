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
        console.log('ε€εΆζε')
    })
}

main(process.argv.slice(2))