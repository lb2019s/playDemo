const jwt = require('jsonwebtoken')

const secret = 'meiemei'
const opt = {
    key: 'user',
    secret: 'eeeee'
}

const user = {
    name: 'jjj',
    password: 'q2344f'
}

const token = jwt.sign({
    data: user,
    exp: Math.floor(Date.now() / 1000) + 60
}, secret)

console.log('token', token);

console.log('解码：', jwt.verify(token, secret));