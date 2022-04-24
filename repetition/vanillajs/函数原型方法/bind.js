// repeat 2
Function.prototype._bind = function (context, ...args) {
    context = context || window
    const fn = Symbol()
    const _this = this
    const result = function (..._args) {
        args = args.concat(_args)
        let returnValue
        if (this instanceof _this) {
            this[fn] = _this
            returnValue = this[fn](...args)
            delete this[fn]
        } else {
            context[fn] = _this
            returnValue = context[fn](...args)
            delete context[fn]
        }
        return returnValue
    }
    result.prototype = Object.create(_this.prototype)
    return result
}

Function.prototype.__bind = function (context) {
    context = context || window
    const _this = this
    let args = Array.prototype.slice.call(arguments, 1)
    const F = function () { }
    const result = function () {
        let _args = Array.prototype.slice.call(arguments)
        return _this.apply(this instanceof _this ? this : context, args.concat(_args))
    }
    F.prototype = _this.prototype
    result.prototype = new F()
    return result
}

function Person(name, age) {
    console.log(name);
    console.log(age);
    console.log(this);
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
    console.log(name);
    console.log(age);
    console.log(this);
    console.log(this.objName);
    console.log(this.objAge);
}
// 先测试作为构造函数调用
let bindFun
bindFun = Person._bind(obj, '我是参数传进来的name')
let a = new bindFun('我是参数传进来的age')
a.say()

// 再测试作为普通函数调用
bindFun = normalFun._bind(obj, '我是参数传进来的name')
bindFun('我是参数传进来的age')
console.log(obj)