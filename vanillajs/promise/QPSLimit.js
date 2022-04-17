function qpsLimit(requestPipe, limitMax = 3) {
    let reqPool = []

    // 往并发池里塞入promise
    const add = () => {
        let _req = requestPipe.shift()

        reqPool.push(_req)
    }

    const replace = (index) => {
        reqPool[index] = requestPipe.shift().then(res => {
            console.log(res)
            return index
        })
    }

    // 执行实际请求
    const run = () => {
        if (requestPipe.length === 0) return
        // 池子满了发车后，直接race
        let _finish = Promise.race(reqPool)

        _finish.then(index => {
            // 做一个id整理
            // let _done = reqPool.indexOf(_finish)
            // console.log('_done', _done)
            // reqPool.splice(_done, 1)
            // add()
            replace(index)
            run()
        })
    }

    while (reqPool.length < limitMax) {
        add()
    }
    reqPool = reqPool.map((p, i) => p.then((res) => {
        console.log(res)
        return i
    }))
    run()
}

const arr = [1, 2, 3, 4, 5].map(item => {
    return Promise.resolve(item)
})

qpsLimit(arr)