// Promise.all
Promise._all = function (promiseArr) {
    if (!Array.isArray(promiseArr)) {
        throw new TypeError('may only be a Array')
    }
    return new Promise((resolve, reject) => {
        const res = []
        let count = 0
        if (promiseArr.length === 0) return res
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                count++
                res[index] = value
                if (count === promiseArr.length) {
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    })
}

// const pro1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// })
// const pro2 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(2)
//     }, 2000)
// })
// const pro3 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(3)
//     }, 3000)
// })

// Promise._all([pro3, pro2, pro1]).then(res => {
//     console.log(res)
// })


// Promise.resolve
Promise._resolve = function (value) {
    if (value && value instanceof Promise) {
        return value
    }
    return new Promise(resolve => resolve(value))
}

// 测试一下，还是用刚才的例子
// 1. 非Promise对象，非thenable对象
// Promise.resolve(1).then(console.log) // 1

// // 2. Promise对象成功状态
// const p2 = new Promise((resolve) => resolve(2))

// Promise.resolve(p2).then(console.log) // 2

// // 3. Promise对象失败状态
// const p3 = new Promise((_, reject) => reject('err3'))

// Promise.resolve(p3).catch(console.error) // err3

// // 4. thenable对象
// const p4 = {
//     then(resolve) {
//         setTimeout(() => resolve(4), 1000)
//     }
// }
// Promise.resolve(p4).then(console.log) // 4

// // 5. 啥都没传
// Promise.resolve().then(console.log) // undefined


// Promise.reject
Promise._reject = function (reason) {
    return new Promise((_, reject) => reject(reason))
}


// Promise.race
Promise._race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise._resolve(p).then(resolve).catch(reject)
        })
    })
}

// 测试一下
// console.log('race')
// const p_1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 1)
// })

// const p_2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 2)
// })

// Promise.race([p_1, p_2]).then((value) => {
//     console.log(value) // 2
// })

// Promise.race([p_1, p_2, 3]).then((value) => {
//     console.log(value) // 3
// })


// Promise.allSettled
Promise._allSettled = function (promises) {
    if (!Array.isArray(promises)) {
        return promises
    }
    let count = 0
    const res = []
    if (promises.length === 0) {
        return res
    }

    return new Promise((resolve, reject) => {
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(value => {
                    res[i] = {
                        status: 'fulfilled',
                        value: value
                    }
                    count++
                    if (count === promises.length) {
                        resolve(res)
                    }
                })
                .catch(reason => {
                    res[i] = {
                        status: 'rejected',
                        reason: reason
                    }
                    count++
                    if (count === promises.length) {
                        resolve(res)
                    }
                })
        })
    })
}


// 测试一下
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
    setTimeout(() => resolve(2), 100)
})
const p3 = new Promise((resolve) => {
    setTimeout(() => resolve(3), 300)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
// const p11 = Promise.allSettled([p1, p2, p3])
//     .then((res) => console.log(JSON.stringify(res, null, 2)))

// 2. 有一个Promise失败了
// const p12 = Promise.allSettled([p1, p2, p4])
//     .then((res) => console.log(JSON.stringify(res, null, 2)))

// 3. 有两个Promise失败了
// const p13 = Promise.allSettled([p1, p4, p5])
//     .then((res) => console.log(JSON.stringify(res, null, 2)))




// Promise.any
Promise._any = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        const errors = []
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(resolve)
                .catch(reason => {
                    count++
                    errors[i] = new Error(reason)
                    if (count === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'))
                        // reject(errors)
                    }
                })
        })
    })
}

Promise.any([p4, p5]).then(console.log)
    .catch(error => {
        console.log(error)
        console.log(error.errors)
    })



// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('a')
//     }, 0)
//     reject('b')
// }).then((res) => {
//     console.log('1', res)
//     return res
// }, err => {
//     console.log('1', err)
//     return err
// }).then(res => {
//     console.log('res', res)
// }, err => {
//     console.log('err', err)
// })