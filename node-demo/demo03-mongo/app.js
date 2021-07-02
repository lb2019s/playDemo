const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'itying'

const client = new MongoClient(url, { useUnifiedTopology: true })

client.connect(err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('数据链接成功')

    const db = client.db(dbName)
    const collection = db.collection('user')

    // 查询
    // collection.find({}).toArray((err, data) => {
    //     console.log(data)
    //     client.close()
    // })

    // 添加
    // collection.insertOne({name: '王六'}, (err, data) => {
    //     if (err) {
    //         console.log('添加失败')
    //         console.log(err)
    //         return
    //     }
    //     console.log(data)
    //     client.close()
    // })

    // 修改
    // collection.updateMany({name: /王五|王六/}, {$set: {age: 16}}, (err, data) => {
    //     if (err) {
    //         console.log('修改失败')
    //         console.log(err)
    //         return
    //     }
    //     console.log(data)
    //     client.close()
    // })

    // 删除
    // collection.deleteOne({name: '王五'}, err => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     console.log('删除成功')
    //     client.close()
    // })
})