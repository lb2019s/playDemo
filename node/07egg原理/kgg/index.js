// const app = new (require('koa'))()
// const { initRouter } = require('./kgg-loader')

// app.use(initRouter().routes())
// app.listen(3000)

const Kgg = require('./kgg')
const app = new Kgg()
app.start(3000)