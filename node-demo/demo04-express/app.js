const { hostname } = require('os')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const loginRouter = require('./router/login')
const adminRouter = require('./router/admin')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

// 内置中间件
app.use(express.static('static'))

// 应用级中间件
app.use((req, res, next) => {
    console.log(new Date())
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParse('itying'))
app.use(session({
    secret: 'keyboard cat',
    name: 'itying',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true 只有 HTTPS 能访问,
    rolling: true, // 访问刷新失效时间
    store: new MongoStore({
        url: 'mongodb://localhost:27017/shop',
        touchAfter: 24 * 3600 // See below for details
    })
}))

app.use('/login', loginRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => {
    // res.cookie('name', '战三', { maxAge: 1000 * 60 * 60, path: '/cookie', signed: true })
    res.cookie('name', '战三', { maxAge: 1000 * 60 * 60, signed: true })
    if (req.session.username) {
        res.send(req.session.username + '已登录' + '<br><a href="/login/loginOut">退出</a>')
    } else {
        let query = req.query
        res.render('index', {
            query
        })
    }
})

app.get('/cookie', (req, res) => {
    res.send('cookie' + req.cookies.name)
})

app.get('/getCookie', (req, res) => {
    res.send('get-cookie' + req.cookies.name)
})

app.get('/signedCookie', (req, res) => {
    res.send('signed-cookie' + req.signedCookies.name)
})

// 路由级中间件
app.get('/news/add', (req, res, next) => {
    // res.send('添加新闻')
    console.log('添加新闻')
    next()
})

app.get('/news/:id', (req, res) => {
    let id = req.params['id']
    res.render('news', {
        id
    })
})


// 错误处理中间件
app.use((req, res, next) => {
    res.status(404).send('404！页面找不到了！')
})

app.listen(port, () => { console.log(`服务器运行在：http://${hostname}:${port}`) })