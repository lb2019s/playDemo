function selection(arr) {
    let length = arr.length
    for (let i = 0; i < length; i++) {
        let index = i
        for (let j = i + 1; j < length; j++) {
            index = arr[j] < arr[index] ? j : index
        }
        [arr[i], arr[index]] = [arr[index], arr[i]]
    }
    return arr
}

const arr = [-3, -1, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(selection(arr))