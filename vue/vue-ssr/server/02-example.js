const server = require('express')()
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const favicon = require('serve-favicon')
const path = require('path')

server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

server.get('*', (req, res) => {
    console.log(req.url)
    const app = new Vue({
        template: `<div>{{url}}</div>`,
        data: {
            url: req.url
        }
    })
    renderer.renderToString(app).then(html => {
        res.send(html)
    }).catch(err => {
        console.error(err)
        res.status = 500
        res.send('Internal Server Error')
    })
})

server.listen(3030, () => {
    console.log('server running https://localhost:3030')
})