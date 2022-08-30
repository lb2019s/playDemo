function limit(arr, limit = 3) {
    const promises = arr.splice(0, limit).map((item, index) => {
        return item.then(() => index)
    })
    let p = Promise.race(promises)
    for (let i = 0; i < arr.length; i++) {
        p = p.then(index => {
            promises[index] = arr[i].then(() => index)
            return Promise.race(promises)
        })
    }
}

let arr = [
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    }).then(() => {
        console.log('1000 - 1')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 100)
    }).then(() => {
        console.log('100 - 1')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 200)
    }).then(() => {
        console.log('200 - 1')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 300)
    }).then(() => {
        console.log('300 - 1')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 100)
    }).then(() => {
        console.log('100 - 2')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 200)
    }).then(() => {
        console.log('200 - 2')
    }),
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 100)
    }).then(() => {
        console.log('100 - 3')
    })
]

limit(arr, 3)