const flatten = function (arr) {
    // return arr.flat(Infinity)
    // return withReduce(arr)
    return [...withGenerator(arr)]
}

function withReduce(arr) {
    return arr.reduce((result, item) => result.concat(Array.isArray(item) ? withReduce(item) : item), [])
}

function* withGenerator(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* withGenerator(item)
        } else {
            yield item
        }
    }
}

console.log(flatten([1, [2, [3, [4, [5]]]]]))