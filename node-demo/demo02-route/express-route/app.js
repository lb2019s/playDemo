const http = require('http')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const { hostname } = require('os')
const app = require('./module/route')
const MongoClient = require('./mongo')

const dbUrl = 'mongodb://127.0.0.1:27017'

http.createServer(app).listen(3000, () => {
    console.log(`服务器运行 http://${hostname}:3000`)
})

app.static('static')

app.get('/', function (req, res) {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err)
            return
        }
        const db = client.db('itying')
        const collection = db.collection('user')
        collection.find().toArray((err, result) => {
            if (err) {
                console.log(err)
                return
            }
            client.close()
            let outData = '<ul>'
            result.map(item => {
                outData += `<li>${JSON.stringify(item)}</li>`
            })
            outData += '</ul>'
            res.send('首页' + outData)
        })
    })
})

app.get('/login', function (req, res) {
    let data = fs.readFileSync(path.join('.', 'view', 'login.html'))
    res.send(data)
})

app.post('/doLogin', function (req, res) {
    res.send(req.body)
})

app.get('/register', function (req, res) {
    let data = fs.readFileSync(path.join('.', 'view', 'register.html'))
    res.send(data)
})

app.post('/doRegister', function (req, res) {
    const userInfo = querystring.parse(req.body)
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('itying')
        const collection = db.collection('user')
        collection.insertOne(userInfo, err => {
            if (err) {
                res.send('添加失败')
                return
            }
            res.send('添加成功')
        })
    })
})