const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const load = (dir, cb) => {
    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        filename = filename.replace('.js', '')
        file = require(url + '/' + filename)
        cb(filename, file)
    })
}

const initRouter = (app) => {
    const router = new Router()
    load('./routes', (filename, routes) => {
        const prefix = filename === 'index' ? '' : `/${filename}`
        routes = typeof routes === 'function' ? routes(app) : routes
        Reflect.ownKeys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log('正在映射地址：' + method.toLocaleUpperCase() + ' ' + prefix + path);
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })
    return router
}

const initController = () => {
    const control = {}
    load('./controller', (filename, controller) => {
        control[filename] = controller
    })
    return control
}

const initService = (app) => {
    const services = {}
    load('./service', (filename, service) => {
        services[filename] = service(app)
    })
    return services
}

const sequelize = require('sequelize')
const loadConfig = (app) => {
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new sequelize(conf.db)
            app.$model = {}
            load('./model', (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }

        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const middlewarePath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(middlewarePath))
            })
        }
    })
}

const schedule = require('node-schedule')
const initSchedule = () => {
    load('schedule', (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
    })
}

module.exports = {
    initRouter,
    initController,
    initService,
    loadConfig,
    initSchedule
}