// 原型链继承
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.getName = function () {
    return this.name
}

function Dog() { }
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

// var dog1 = new Dog()
// dog1.colors.push('yellow')
// var dog2 = new Dog()
// console.log(dog1)
// console.log(dog2)

// 原型链继承存在的问题：
// 问题1：原型中包含的引用类型属性将被所有实例共享；
// 问题2：子类在实例化的时候不能给父类构造函数传参；

// 借助构造函数传参
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
    this.getName = function () {
        return this.name
    }
}
function Dog(name) {
    Animal.call(this, name)
}
Dog.prototype = new Animal()

// var dog1 = new Dog('hua')
// dog1.colors.push('yellow')
// var dog2 = new Dog('huzi')
// console.log(dog1)
// console.log(dog2)


// 组合继承
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.getName = function () {
    return this.name
}

function Dog(age, name) {
    Animal.call(this, name)
    this.age = age
}
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

// var dog1 = new Dog(2, 'huahua')
// dog1.colors.push('yellow')
// var dog2 = new Dog(2, 'huzi')
// console.log(dog1)
// console.log(dog2)

// 组合继承已经相对完善了，但还是存在问题，它的问题就是调用了 2 次父类构造函数，第一次是在 new Animal()，第二次是在 Animal.call() 这里。

// 寄生组合继承

function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.getName = function () {
    return this.name
}

function Dog(age, name) {
    Animal.call(this, name)
    this.age = age
}

function object(o) {
    function F() { }
    F.prototype = o
    return new F()
}

function inheritPrototype(child, parent) {
    const prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
inheritPrototype(Dog, Animal)
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.constructor = Dog

// var dog1 = new Dog(2, 'huahua')
// dog1.colors.push('yellow')
// var dog2 = new Dog(2, 'huzi')
// console.log(dog1.getName(), dog1)
// console.log(dog2)

// class 继承
class AnimalClass {
    constructor(name) {
        this.name = name
        this.colors = ['black', 'white']
    }
    getName() {
        return this.name
    }
}

class DogClass extends AnimalClass {
    constructor(age, name) {
        super(name)
        this.age = age
    }
}

var dog1 = new DogClass(2, 'huahua')
dog1.colors.push('yellow')
var dog2 = new DogClass(2, 'huzi')
console.log(dog1.getName(), dog1)
console.log(dog2)