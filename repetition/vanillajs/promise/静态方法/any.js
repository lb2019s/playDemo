Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let res = []
        promises.forEach((item, index) => {
            Promise.resolve(item).then(resolve)
                .catch(reason => {
                    res[index] = new Error(reason)
                    count++
                    if (count === promises.length) {
                        // reject(res)
                        reject(new AggregateError(res, 'All promises were rejected'))
                    }
                })
        })
    })
}

Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError(' '))
        }
        let count = 0
        let result = []
        promises.forEach((item, index) => {
            Promise.resolve(item).then(resolve).catch(reason => {
                result[index] = reason
                count++
                if (count === promises.length) {
                    reject(result)
                }
            })
        })
    })
}