const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const restful = require('./framework/router')
const { loadModal } = require('./framework/loader')
const { db } = require('./config')

loadModal({
    url: db.url,
    options: db.options
})(app)

app.use(bodyparser())
app.use(require('koa-static')(__dirname + '/'))
app.use(restful)

const port = 3000
app.listen(port, () => {
    console.log('app started at ' + port);
})