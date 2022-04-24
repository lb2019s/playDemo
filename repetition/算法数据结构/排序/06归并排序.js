function sort(arr) {
    mergeSort(arr, 0, arr.length - 1)
    return arr
}

function mergeSort(array, left, right) {
    if (left === right) return
    const mid = left + ((right - left) >> 1)
    mergeSort(array, left, mid)
    mergeSort(array, mid + 1, right)
    const aux = []
    for (let i = left; i <= right; i++) {
        aux[i] = array[i]
    }
    let i = left, j = mid + 1
    for (let k = left; k <= right; k++) {
        if (i > mid) {
            array[k] = aux[j++]
        } else if (j > right) {
            array[k] = aux[i++]
        } else {
            array[k] = aux[i] > aux[j] ? aux[j++] : aux[i++]
        }
    }
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(sort(arr))