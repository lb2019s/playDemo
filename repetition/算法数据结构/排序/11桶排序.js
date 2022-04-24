function bucket(array, bucket_size = 5) {
    let min = Infinity
    let max = -Infinity
    for (let i = 0; i < array.length; i++) {
        max = Math.max(max, array[i])
        min = Math.min(min, array[i])
    }
    const bucket_count = Math.floor((max - min) / bucket_size) + 1
    const buckets = Array.from({ length: bucket_count }).map(() => [])
    for (let i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - min) / bucket_size)].push(array[i])
    }

    const result = []
    for (let j = 0; j < buckets.length; j++) {
        insertion(buckets[j])
        result.push(...buckets[j])
    }
    return result
}

function insertion(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
    }
    return array
}

// const arr = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
const arr = [1, 20, 31, 45, 506, 6980, 77, 8, 9, 5.5, 55.5]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(bucket(arr))