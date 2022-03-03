const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
    const { url } = req
    if (url === '/favicon.ico') {
        res.end('')
    } else {
        res.setHeader('Set-Cookie', "token=2wsx;domian=localhost:8080")
        const file = fs.readFileSync('./index.html')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(file)
    }
})
.listen(8080)