Promise.allSettled = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError('may be a array'))
        }
        let count = 0
        const res = []
        if (promises.length === 0) return res

        promises.forEach((item, index) => {
            Promise.resolve(item).then(value => {
                res[index] = {
                    status: 'fulfilled',
                    value
                }
            }).catch(reason => {
                res[index] = {
                    status: 'rejected',
                    reason
                }
            }).finally(() => {
                count++
                if (count === promises.length) {
                    resolve(res)
                }
            })
        })
    })
}

const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
    console.log(results);
});


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
const p11 = Promise.allSettled([p1, p2, p3])
    .then((res) => console.log(JSON.stringify(res, null, 2)))

// 2. 有一个Promise失败了
const p12 = Promise.allSettled([p1, p2, p4])
    .then((res) => console.log(JSON.stringify(res, null, 2)))

// 3. 有两个Promise失败了
const p13 = Promise.allSettled([p1, p4, p5])
    .then((res) => console.log(JSON.stringify(res, null, 2)))