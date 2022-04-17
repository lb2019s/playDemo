function instanceOf(left, right) {
    while (true) {
        if (left === null) return false
        if (left.__proto__ === right.prototype) {
            return true
        }
        // left = left.__proto__
        left = Object.getPrototypeOf(left)
    }
}

console.log(instanceOf([], Object))
console.log(instanceOf([], String))