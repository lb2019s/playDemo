function flatten(array) {
    return withReduce(array)
    return withStack(array)
    return [...withGenerator(array)]
    return withSome(array)
    return withConcat(array)
    return array.flat(Infinity)
}

function withConcat(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            result = result.concat(withConcat(array[i]))
            // result = [...result, ...withConcat(array[i])]
        } else {
            result.push(array[i])
        }
    }
    return result
}

function withSome(array) {
    while (array.some(item => Array.isArray(item))) {
        array = [].concat(...array)
    }
    return array
}

function withReduce(array) {
    return array.reduce((arr, cur) => arr.concat(Array.isArray(cur) ? withReduce(cur) : cur), [])
}

function* withGenerator(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* withGenerator(item)
        } else {
            yield item
        }
    }
}

function withStack(array) {
    const stack = [...array]
    const res = []
    while (stack.length) {
        const item = stack.pop()
        if (Array.isArray(item)) {
            stack.push(...item)
        } else {
            res.push(item)
        }
    }
    return res.reverse()
}

console.log(flatten([1, [2, [3, [4, [5]]]]]))