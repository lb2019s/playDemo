function insertion(arr) {
    let length = arr.length
    for (let i = 1; i < length; i++) {
        for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
    }
    return arr
}

// repeat
function insertion(arr) {
    const len = arr.length
    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            swap(arr, j, j - 1)
        }
    }
    return arr
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(insertion(arr))