const app = require('express')()
const path = require('path')
const mongodb = require('./models/db')

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
    const { page, category, keyword } = req.query
    const condition = {}
    if (category) {
        condition.category = category
    }
    if (keyword) {
        condition.name = { $regex: new RegExp(keyword) }
    }
    // console.log(condition);
    try {
        const col = mongodb.col('fruits')
        const total = await col.find(condition).count()
        const fruits = await col.find(condition)
            .skip((page - 1) * 5)
            .limit(5)
            .toArray()
        res.setHeader('cache-control', 'no-store')
        res.json({
            ok: 1,
            data: {
                fruits,
                pagination: {
                    total,
                    page
                }
            }
        })
    } catch(error) {
        console.log(error);
    }
})

app.get('/api/category', async (req, res) => {
    const col = mongodb.col('fruits')
    const data = await col.distinct('category')
    res.json({
        ok: 1,
        data
    })
})

app.listen(3000, () => {
    console.log('run http://localhost:3000');
})