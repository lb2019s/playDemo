// 控制并发
function limitLoad(urls, handler, limit) {
    const sequence = [].concat(urls)
    let promises = []
    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index
        })
    })
    let p = Promise.race(promises)
    for (let i = 0; i < sequence.length; i++) {
        p = p.then(index => {
            promises[index] = handler(sequence[i]).then(() => {
                return index
            })
            return Promise.race(promises)
        })
    }

}
const urls = [
    {
        info: 'link1',
        time: 200
    },
    {
        info: 'link2',
        time: 100
    },
    {
        info: 'link3',
        time: 300
    },
    {
        info: 'link4',
        time: 200
    },
    {
        info: 'link5',
        time: 200
    },
    {
        info: 'link6',
        time: 200
    }
]

function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log('--> ' + url.info + ' start')
        setTimeout(() => {
            console.log('<-- ' + url.info + ' OK!')
            resolve()
        }, url.time)
    })
}

limitLoad(urls, loadImg, 3)