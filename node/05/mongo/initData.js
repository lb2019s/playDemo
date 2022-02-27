const mongodb = require('./models/db')

mongodb.once('connect', async () => {
    const col = mongodb.col('fruits')
    await col.deleteMany()
    const data = new Array(100)
        .fill()
        .map((v, i) => {
            return {
                name: 'uuu' + i,
                price: i,
                category: Math.random() < 0.5 ? '水果' : '蔬菜'
            }
        })
    await col.insertMany(data)
    console.log('初始化成功');
})