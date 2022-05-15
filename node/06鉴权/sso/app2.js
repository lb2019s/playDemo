const http = require('http')

http.createServer((req, res) => {
    const { url } = req
    if (url === '/favicon.ico') {
        res.end('')
    } else if (url === '/api/users') {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            name: 999
        }))
    } else if (url === '/') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            title: 'Quit'
        }))
    } else {
        // res.setHeader('Set-Cookie', "token=2wsx")
        res.end('<h1>嘤嘤嘤w</h1>')
    }
})
.listen(8081)