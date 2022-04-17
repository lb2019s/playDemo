// call
Function.prototype._call = function (context, ...args) {
    context = context || window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

// apply
Function.prototype._apply = function (context, args) {
    context = context || window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

// bind
Function.prototype._bind = function (context, ...args) {
    context = context || window
    const fn = Symbol()
    const _this = this
    const result = function (...innerArgs) {
        if (this instanceof _this) {
            this[fn] = _this
            this[fn](...[...args, ...innerArgs])
            delete this[fn]
        } else {
            context[fn] = _this
            context[fn](...[...args, ...innerArgs])
            delete context[fn]
        }
    }
    result.prototype = Object.create(_this.prototype)
    return result
}

// const obj = {
//     0: 1,
//     1: 2,
//     length: 2
// }

// let res
// res = Array.prototype.reduce._call(obj, (sum, cur) => sum + cur, 10)
// res = Array.prototype.reduce._apply(obj, [(sum, cur) => sum + cur, 10])
// console.log(res)

function Person(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //构造函数this指向实例对象
    this.name = name
    this.age = age
}
// 构造函数原型的方法
Person.prototype.say = function () {
    console.log('hello', this.name, this.age);
}
let obj = {
    objName: '我是obj传进来的name',
    objAge: '我是obj传进来的age'
}
// 普通函数
function normalFun(name, age) {
    console.log(name);   //'我是参数传进来的name'
    console.log(age);   //'我是参数传进来的age'
    console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
    console.log(this.objName); //'我是obj传进来的name'
    console.log(this.objAge); //'我是obj传进来的age'
}

// 先测试作为构造函数调用
let bindFun
bindFun = Person._bind(obj, '我是参数传进来的name')
let a = new bindFun('我是参数传进来的age')
a.say() //123

// 再测试作为普通函数调用
bindFun = normalFun._bind(obj, '我是参数传进来的name')
bindFun('我是参数传进来的age')
