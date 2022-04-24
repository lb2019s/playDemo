import express from 'express'
import path from 'path'
import fs from 'fs'
import { transformCode, transformCss } from './transform'

const TargetRootPath = path.join(__dirname, '../target')

export async function dev() {
    const app = express()

    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'text/html')
        const htmlPath = path.join(TargetRootPath, 'index.html')
        let html = fs.readFileSync(htmlPath, 'utf-8')
        html = html.replace('<head>', '<head><script type="module" src="/@vite/client"></script>')
        res.send(html)
    })

    app.get('/@vite/client', (req, res) => {
        res.set('Content-Type', 'application/javascript')
        res.send(
            transformCode({
                path: req.path,
                code: fs.readFileSync(path.join(__dirname, 'client.js'), 'utf-8')
            }).code
        )
    })

    app.get('/target/*', (req, res) => {
        const extname = path.extname(req.path)
        const filePath = path.join(TargetRootPath, '../', req.path)
        console.log('extname', extname)
        console.log('path', req.path)
        console.log('filePath', filePath)
        switch (extname) {
            case '.css': {
                res.setHeader('Content-Type', 'application/javascript')
                res.send(
                    transformCss({
                        code: fs.readFileSync(filePath, 'utf-8')
                    })
                )
                break
            }
            case '.js': {
                res.setHeader('Content-Type', 'application/javascript')
                const js = fs.readFileSync(filePath, 'utf-8')
                console.log('js ====>', js)
                res.send(js)
                break
            }
        }
    })

    const port = 3000
    app.listen(port, () => {
        console.log('server running http://localhost:3000')
    })
}