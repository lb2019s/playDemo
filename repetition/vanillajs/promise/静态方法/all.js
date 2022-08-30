Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError('must be array'))
        }
        let count = 0
        const res = []
        promises.forEach((item, index) => {
            Promise.resolve(item).then((value) => {
                res[index] = value
                count++
                if (count === promises.length) {
                    resolve(res)
                }
            }).catch(reject)
        })
    })
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError(' '))
        }
        let count = 0
        let result = new Array(promises.length)
        promises.forEach((item, index) => {
            Promise.resolve(item).then(value => {
                result[index] = value
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            }).catch(reject)
        })
    })
}

const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e);

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));