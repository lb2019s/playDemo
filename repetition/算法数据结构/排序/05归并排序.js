function mergeSort(arr) {
    return merge(arr, 0, arr.length - 1)
}

function merge(array, left, right) {
    if (left === right) {
        return [array[left]]
    }
    const mid = left + ((right - left) >> 1)
    const low = merge(array, left, mid)
    const high = merge(array, mid + 1, right)
    const result = []
    let lo = 0, hi = 0
    while (lo < low.length && hi < high.length) {
        result.push(low[lo] < high[hi] ? low[lo++] : high[hi++])
    }
    if (lo < low.length) {
        result.push(low[lo++])
    }
    if (hi < high.length) {
        result.push(high[hi++])
    }
    return result
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(mergeSort(arr))