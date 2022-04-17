const koa = require('koa')
const app = new koa()
const static = require('koa-static')
const router = require('koa-router')()
const fs = require('fs')

app.use(static(__dirname))

// router.get('/', ctx => {
//     ctx.body = fs.readFileSync('./index.html')
// })

router.get('/info', ctx => {
    ctx.body = {
        name: 'tom'
    }
})

app.use(router.routes())
app.listen(3000)
