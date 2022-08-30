function deepClone(target) {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel()
        port1.onmessage = event => resolve(event.data)
        port2.postMessage(target)
    })
}

const a = {}
const obj = {
    name: '哇哈哈',
    age: 1,
    features: ['w', 'e', 'r'],
    parent: {
        name: '哇嘎嘎'
    },
    loop: a,
    time: new Date(),
    // getName: function () { return this.name }
}

a.loop = obj

deepClone(obj).then(res => {
    console.log(res)
})