function typeOf(target) {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

console.log(typeOf(''))
console.log(typeOf(8))
console.log(typeOf({}))
console.log(typeOf([]))