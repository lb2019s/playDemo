const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login', {})
})

router.get('/loginOut', (req, res) => {
    // req.session.cookie.maxAge = 0
    // req.session.username = null
    req.session.destroy()
    res.send('退出登录' + '<br><a href="/">首页</a>')
})

router.post('/doLogin', (req, res) => {
    req.session.username = '李四'
    let body = req.body
    res.send('<a href="/">首页</a><br>' + JSON.stringify(body))
})

module.exports = router