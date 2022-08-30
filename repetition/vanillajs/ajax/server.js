const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    console.log(req.body)
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        return res.end(fs.readFileSync('./index.html'))
    }
    if (req.url.includes('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
        return res.end(fs.readFileSync(path.join('./', req.url)))
    }
    if (req.url === '/users') {
        res.setHeader('Content-Type', 'application/json')
        let data = {}
        if (req.method.toLowerCase() === 'get') {
            data = {
                name: 'tom'
            }
            return res.end(JSON.stringify(data))
        } else if (req.method.toLowerCase() === 'post') {
            let str = ""
            req.on('data', chunk => {
                str += chunk
            })
            req.on('end', () => {
                console.log('body', str)
                data = [
                    {
                        name: 'tom'
                    },
                    {
                        name: 'jerry'
                    }
                ]
                return res.end(JSON.stringify(data))
            })
        }
    } else {
        res.end('')
    }
}).listen(3000, () => {
    console.log('server running http://localhost:3000')
})