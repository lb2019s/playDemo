class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(event, fn) {
        let events = this.cache[event] || []
        events.push(fn)
        this.cache[event] = events
    }

    emit(event, ...args) {
        let events = this.cache[event]
        if (events) {
            events.forEach(fn => fn(...args))
        }
    }

    off(event, fn) {
        let events = this.cache[event]
        if (events) {
            this.cache[event] = events.filter(f => f !== fn)
        }
    }

    once(event, fn) {
        const that = this
        const once = function (...args) {
            fn.apply(this, args)
            that.off(event, once)
        }
        this.on(event, once)
    }
}

let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', '布兰', 12)
eventBus.once('bbb', (a, b) => { console.log('once', a + b) })
eventBus.emit('bbb', 1, 2)
eventBus.emit('bbb', 2, 3)
