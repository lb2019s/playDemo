const url = require('url')
const path = require('path')
const fs = require('fs')

function getFileMime(extname) {
    let data = fs.readFileSync(path.join('.', 'mime.json'))
    let mimeMap = JSON.parse(data)
    return mimeMap[extname]
}

function initStatic(req, res, staticPath) {
    let pathname = url.parse(req.url).pathname
    let extname = path.extname(pathname)
    try {
        let filePath = path.join('.', staticPath, pathname)
        let data = fs.readFileSync(filePath)
        if (data) {
            let mime = getFileMime(extname)
            res.writeHead(200, { 'Content-Type': `${mime}; charset="utf-8"` })
            res.end(data)
        }
    } catch(error) {
        
    }
}

function changeRes(res) {
    res.send = (data) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset="utf-8"'})
        res.end(data)
    }
}

const server = () => {

    let G = {
        _get: {},
        _post: {},
        staticPath: 'static'
    }

    const app = (req, res) => {
        const pathname = url.parse(req.url).pathname
        const method = req.method.toLowerCase()
        initStatic(req, res, G.staticPath)
        if (G['_' + method][pathname]) {
            changeRes(res)
            if (method === 'post') {
                let body = []
                req.on('data', chunk => {
                    body.push(chunk)
                })
                req.on('end', () => {
                    body = Buffer.concat(body).toString()
                    req.body = body
                    G['_' + method][pathname](req, res)
                })
            } else {
                G['_' + method][pathname](req, res)
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html; charset="utf-8"' })
            res.end('页面不存在')
        }
        
    }

    app.get = (str, cb) => {
        G._get[str] = cb
    }

    app.post = (str, cb) => {
        G._post[str] = cb
    }

    //配置静态web服务
    app.static = (staticPath) => {
        G.staticPath = staticPath
    }

    return app
}


module.exports = server()