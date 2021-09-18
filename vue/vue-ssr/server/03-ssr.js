const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const favicon = require('serve-favicon')
const path = require('path')
const fs = require('fs')
const server = express()

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
server.use(express.static(resolve('../dist/client'), { index: false }))
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('../dist/client/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // 推荐
    template: fs.readFileSync(resolve("../public/index.html"), "utf-8"), // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
})

server.get('*', (req, res) => {
    const context = {
        title: 'vue ssr',
        url: req.url
    }

    renderer.renderToString(context).then(html => {
        res.send(html)
    }).catch(err => {
        console.error(err)
        res.status = 500
        res.send('Internal Server Error');
    })
})

server.listen(3030, () => {
    console.log('server running http://localhost:3030')
})