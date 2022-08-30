function Animal(name, age) {
    this.name = name
    this.age = age
}

Animal.prototype.eat = function (food) {
    console.log(`eat ${food} ...`)
}

function Dog(name, age, colors) {
    Animal.call(this, name, age)
    this.colors = colors
}

Dog.prototype = new Animal()
Dog.prototype.constructor = Dog


// 组合继承已经相对完善了，但还是存在问题，
// 它的问题就是调用了 2 次父类构造函数，第一次是在 new Animal()，第二次是在 Animal.call() 这里。