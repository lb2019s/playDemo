function debounce(fn, delay = 300) {
    let timer
    return function (...args) {
        const context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

function input() {
    console.log('wahhh')
}
const deInput = debounce(input, 2000)
console.log('1', deInput())
setTimeout(() => {
    console.log(2)
    deInput()
}, 1000)