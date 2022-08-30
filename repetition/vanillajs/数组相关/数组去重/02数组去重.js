function unique(array) {
    // return withSet(array)
    // return withMap(array)
    return withFilter(array)
}

function withSet(array) {
    return [...new Set(array)]
}

function withMap(array) {
    let map = new Map()
    let res = []
    array.forEach(item => {
        if (map.has(item)) {
            return
        }
        map.set(item, true)
        res.push(item)
    })
    return res
}

function withFilter(array) {
    return array.filter((item, index) => array.indexOf(item) === index)
}

const arr = [+0, -0, 1, 2, 1, 3, {}, {}, NaN, NaN]
console.log(unique(arr))