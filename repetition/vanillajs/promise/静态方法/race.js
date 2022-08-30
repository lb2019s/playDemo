Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError('may be to array'))
            return
        }
        promises.forEach(item => {
            Promise.resolve(item).then(resolve).catch(reject)
        })
    })
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError(' '))
        }
        Promise.forEach(item => {
            Promise.resolve(item).then(resolve).catch(reject)
        })
    })
}