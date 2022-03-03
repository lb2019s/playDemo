const res = require('express/lib/response')
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const redisStore = require('koa-redis')
const { createClient } = require('redis')
const client = createClient(6379, 'localhost')
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
// const wrapper = require('co-redis')
// const client = wrapper(redisClient)

app.keys = ['dalichuqiji']

const SESS_CONF = {
    key: 'wahaha:sess',
    // maxAge: 86400000,
    // httpOnly: true,
    // signed: true,
    store: redisStore({})
}

app.use(session(SESS_CONF, app))

app.use(async (ctx, next) => {
    const keys = await client.keys('*')
    keys.forEach(async (key) => {
        console.log(key, await client.get(key));
    })
    next()
})

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第 ${n} 次访问`
})

app.listen(3000)