
(async () => {
    const { MongoClient } = require('mongodb')
    // 创建客户端
    const client = new MongoClient(
        'mongodb://localhost:27017',
        // {
        //     //userNewUrlParser这个属性会在url⾥识别验证⽤户所需的db
        //     userNewUrlParser: true
        // }
    )
    let ret = await client.connect()
    // console.log('ret', ret);

    const db = client.db('test')
    const fruits = db.collection('fruits')

    ret = await fruits.insertOne({
        name: '橘子',
        price: 33.3
    })
    console.log('插入成功', JSON.stringify(ret));
})()