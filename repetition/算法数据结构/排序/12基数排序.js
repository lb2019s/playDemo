/**
 * 适用于非负整数
 * @param {*} array 
 */
function radix(array) {
    let max = -Infinity
    for (let i = 0; i < array.length; i++) {
        max = Math.max(max, array[i])
    }
    const digit = String(max).length
    let count = []
    let mod = 10
    let dev = 1
    for (let i = 0; i < digit; i++, dev *= 10, mod *= 10) {
        for (let j = 0; j < array.length; j++) {
            let bucket = Math.floor((array[j] % mod) / dev)
            if (count[bucket] === undefined) {
                count[bucket] = []
            }
            count[bucket].push(array[j])
        }
        let index = 0
        for (let k = 0; k < count.length; k++) {
            if (Array.isArray(count[k])) {
                while (count[k].length) {
                    array[index++] = count[k].shift()
                }
            }
        }
        count = []
    }
    return array
}

const arr = [1, 20, 31, 45, 506, 6980, 77, 8, 9]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(radix(arr))