Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let res = []
        promises.forEach((item, index) => {
            Promise.resolve(item).then(resolve)
                .catch(reason => {
                    res.push(new Error(reason))
                    count++
                    if (count === promises.length) {
                        // reject(res)
                        reject(new AggregateError(errors, 'All promises were rejected'))
                    }
                })
        })
    })
}