function sort(arr) {
    return quick(arr)
}
function quick(array) {
    if (array.length <= 1) {
        return array
    }
    const left = []
    const right = []
    const mid = array.splice(Math.floor(array.length / 2), 1)
    array.forEach(item => item <= mid ? left.push(item) : right.push(item))
    return quick(left).concat(mid, quick(right))
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(sort(arr))