function heap(array) {
    let n = array.length
    for (let i = n >> 1; i >= 0; i--) {
        sink(array, i, n)
    }
    while (n > 0) {
        swap(array, 0, --n)
        sink(array, 0, n)
    }
    return array
}

function sink(array, i, n) {
    while (i * 2 + 1 < n) {
        let j = i * 2 + 1
        if (j < n - 1 && array[j + 1] > array[j]) {
            j++
        }
        if (array[i] > array[j]) break
        swap(array, i, j)
        i = j
    }
}

function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]]
}

const arr = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(heap(arr))