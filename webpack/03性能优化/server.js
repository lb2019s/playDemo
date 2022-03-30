const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name: '张三'
    })
})

app.listen(3000)