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
    while (lo < low.length) {
        result.push(low[lo++])
    }
    while (hi < high.length) {
        result.push(high[hi++])
    }
    return result
}

// repeat 
function merger(array, lo, hi) {
    if (lo === hi) {
        return [array[lo]]
    }

    const mid = lo + Math.floor((hi - lo) / 2)
    const left = merge(array, lo, mid)
    const right = merge(array, mid + 1, hi)

    let l = 0
    let r = 0
    let res = []
    while (l < left.length && r < right.length) {
        if (left[l] <= right[r]) {
            res.push(left[l++])
        } else {
            res.push(right[r++])
        }
    }
    while (l < left.length) {
        res.push(left[l++])
    }
    while (r < right.length) {
        res.push(right[r++])
    }
    return res
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(mergeSort(arr))