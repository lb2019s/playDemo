function updateTime() {
    setInterval(() => { this.timer = new Date().toUTCString() }, 3000)
    return this.timer
}

const { timeStamp } = require('console')
const http = require('http')
http.createServer((req, res) => {
    let { url } = req
    if (url === '/') {
        res.end(`
            <html>
                Html update time ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    } else if (url === '/main.js') {
        let content = `document.writeln('<br>JS update time ${updateTime()}')`

        // 强制缓存
        // res.setHeader('Expires', new Date(Date.now() + 5 * 1000).toUTCString())
        // res.setHeader('cache-control', 'max-age=10')


        // 协商缓存
        res.setHeader('cache-control', 'no-cache')
        // res.setHeader('last-modified', new Date().toUTCString())
        // 过去时间
        // if (new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('协商缓存命中。。。');
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }
        // 内容变更
        const crypto = require('crypto')
        const hash = crypto.createHash('sha256').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if (req.headers['if-none-match'] === hash) {
            console.log('Etag 缓存命中。。。');
            res.statusCode = 304
            res.end()
            return
        }
 
        res.statusCode = 200
        res.end(content)
    } else if (url === '/favicon.ico') {
        res.end()
    }
}).listen(3000, () => {
    console.log('Http server run: http://localhost:3000')
})