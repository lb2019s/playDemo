function Animal(name, age) {
    this.name = name
    this.age = age
}

Animal.prototype.eat = function (food) {
    console.log(`eat ${food} ...`)
}

function Dog(colors) {
    this.colors = colors
}

Dog.prototype = new Animal('tom', 16)
Dog.prototype.constructor = Dog

// 原型链继承存在的问题：
// 问题1：原型中包含的引用类型属性将被所有实例共享；
// 问题2：子类在实例化的时候不能给父类构造函数传参；