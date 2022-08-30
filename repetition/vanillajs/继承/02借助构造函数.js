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
