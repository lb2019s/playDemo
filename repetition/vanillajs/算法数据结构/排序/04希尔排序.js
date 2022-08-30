function shell(arr) {
    let h = 1
    while (h < Math.floor(arr.length / 3)) {
        h = Math.floor(arr.length / 3) + 1
    }
    while (h >= 1) {
        for (let i = h; i < arr.length; i++) {
            for (let j = i - h; j >= 0 && arr[j + h] < arr[j]; j -= h) {
                [arr[j], arr[j + h]] = [arr[j + h], arr[j]]
            }
        }
        h = Math.floor(h / 3)
    }
    return arr
}

// const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
const arr = [1, 20, 31, 45, 506, 6980, 77, 8, 9, 5.5, 55.5]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(shell(arr))