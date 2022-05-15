const http = require('http')
const session = {}
http.createServer((req, res) => {
    let { url } = req
    if (url === '/favicon.ico') {
        res.end()
    } else if (url === '/') {
        console.log('get cookie', req.headers.cookie);
        // res.setHeader('Set-Cookie', "cookie=www")
        // res.end('hello cookie')

        const sessionKey = 'sid'
        const cookie = req.headers.cookie
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log(sid, session);
            res.end('hello' + session[sid].name)
        } else {
            const sid = (Math.random() * 999999).toFixed()
            res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
            session[sid] = {
                name: 'waa'
            }
            res.end('hello session')
        }
    }
}).listen(3000)