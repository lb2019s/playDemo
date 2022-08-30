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

function object(o) {
    function F() { }
    F.prototype = o
    return new F()
}

function inheritPrototype(child, parent) {
    child.prototype = object(parent.prototype)
    child.prototype.constructor = child
}

inheritPrototype(Dog, Animal)

