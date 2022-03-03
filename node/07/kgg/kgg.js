const Koa = require('koa')
const { initRouter, initController, initService, loadConfig, initSchedule } = require('./kgg-loader')

class Kgg {
    constructor(config) {
        this.$app = new Koa(config)
        loadConfig(this)
        this.$service = initService(this)
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
        initSchedule()
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('service run http://loalhost:' + port);
        })
    }
}

module.exports = Kgg