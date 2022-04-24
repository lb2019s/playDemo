function sort(arr) {
    quickSort(arr, 0, arr.length - 1)
    return arr
}
function quickSort(array, left, right) {
    if (left >= right) return
    const p = partition(array, left, right)
    quickSort(array, left, p - 1)
    quickSort(array, p + 1, right)
}

function partition(array, lo, hi) {
    const v = array[lo]
    let i = lo, j = hi + 1
    while (true) {
        while (array[++i] < v) {
            if (i === hi) break
        }
        while (array[--j] > v) {
            if (j === lo) break
        }
        if (i >= j) break
        swap(array, i, j)
    }
    swap(array, lo, j)
    return j
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(sort(arr))