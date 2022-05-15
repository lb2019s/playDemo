const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')

const conn = mongoose.connection

conn.on('error', () => {
    console.error('链接失败！');
})

conn.on('open', async () => {
    const schema = mongoose.Schema({
        name: String,
        price: Number
    })

    const model = mongoose.model('fruit', schema) 
    try {
        let ret
        // ret = await model.create({
        //     category: "温带⽔果",
        //     name: "苹果",
        //     price: 5
        // });
        // console.log("插⼊数据:", ret);
        ret = await model.find().count()
        console.log(ret);
        ret = await model.find({name: '苹果'})
        console.log(ret);
    } catch(error) {
        console.log(error);
    }
})