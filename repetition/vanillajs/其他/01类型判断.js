function typeOf(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

console.log(typeOf(0))
console.log(typeOf('o'))
console.log(typeOf(true))
console.log(typeOf(Symbol()))