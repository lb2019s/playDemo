const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
// const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
//配置session的中间件
// app.use(cors({
// credentials: true
// }))
app.keys = ['some secret'];
app.use(static(__dirname + '/'));
app.use(bodyParser())
app.use(session(app));

app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next()
    } else {
        console.log('', ctx.session.userInfo);
        if (!ctx.session.userInfo) {
            ctx.body = {
                message: '未登录！'
            }
        } else {
            next()
        }
    }
})

router.post('/user/login', (ctx) => {
    const { body } = ctx.request
    console.log('body', body);
    ctx.session.userInfo = body.username
    ctx.body = {
        message: '登录成功'
    }
})

router.post('/user/logout', (ctx) => {
    delete ctx.session.userInfo
    ctx.body = {
        message: '登出成功'
    }
})

router.get('/user/getUser', ctx => {
    ctx.body = {
        message: '获取数据成功',
        userInfo: ctx.session.userInfo
    }
})

app.use(router.routes())
app.listen(3000)