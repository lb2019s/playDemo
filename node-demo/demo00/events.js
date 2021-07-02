const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', function (a, b) {
    console.log(a, b, this)
})

eventEmitter.on('end', (a, b) => {
    console.log(a, b, this)
})

eventEmitter.emit('start', 1, 2)
eventEmitter.emit('end', 3, 4)

console.log(eventEmitter.eventNames())
console.log(eventEmitter.getMaxListeners())
console.log(eventEmitter.listenerCount('start'))
console.log(eventEmitter.listeners('start'))