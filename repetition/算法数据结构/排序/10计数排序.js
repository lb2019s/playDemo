/**
 * 只适用于非负整数
 * @param {*} array 
 * @returns 
 */
function count(array) {
    const count = []
    const result = []
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (count[item] === undefined) {
            count[item] = 0
        }
        count[item]++
    }
    for (let i = 0; i < count.length; i++) {
        if (count[i] !== undefined) {
            while (count[i] > 0) {
                result.push(i)
                count[i]--
            }
        }
    }
    return result
}

const arr = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
arr.sort(() => Math.random() - 0.5)
console.log(arr)
console.log(count(arr))