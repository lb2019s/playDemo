const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/shop')

const userSchema = new Schema({
    name: String,
    age: Number,
    sex: String
})

const User = mongoose.model('User', userSchema, 'user')

// User.find({}, (err, data) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log('---', data)
// })

// const user = new User({
//     name: '李四',
//     age: 18,
//     sex: '女'
// })

// user.save((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('添加成功')
// })

// User.updateOne(
//     { name: '张三' },
//     { name: '法外狂徒' },
//     (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('更新成功', data)
//     }
// )


User.deleteOne({ name: '李四' }, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('删除成功', data)
})