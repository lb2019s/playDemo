const fs = require('fs')
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src))
}

function copyStream(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}

function main(argv) {
    if (argv[2] === 'stream') {
        copyStream(argv[0], argv[1])
        return
    }
    copy(argv[0], argv[1])
}

main(process.argv.slice(2))