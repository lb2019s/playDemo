const fs = require('fs')

function copy(src, dst) {
    const rs = fs.createReadStream(src)
    const ws = fs.createWriteStream(dst)

    rs.on('data', (chunk) => {
        if (!ws.write(chunk)) {
            rs.pause()
        } 
    })
    ws.on('drain', () => {
        rs.resume()
    })
    rs.on('end', () => {
        ws.end()
    })
}
function main(argv) {
    copy(argv[0], argv[1])
}

main(process.argv.slice(2))