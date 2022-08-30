function instanceOf(origin, target) {
    while (origin && origin.__proto__) {
        if (origin.__proto__ === target.prototype) {
            return true
        }
        origin = origin.__proto__
    }
    return false
}

console.log(instanceOf([], Object))
console.log(instanceOf([], String))
console.log(instanceOf('1', String))