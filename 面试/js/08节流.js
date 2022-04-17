function throttle(fn, delay = 300) {
    let previous = 0
    return function (...args) {
        let now = Date.now()
        if (now - previous > delay) {
            fn(...args)
            previous = now
        }
    }
}

function throttle(fn, delay = 300) {
    let timer = null
    return function (...args) {
        if (timer) return
        const context = this
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, delay)
    }
}

function throttle(fn, delay = 300) {
    let startTime = Date.now()
    let timer = null
    return function (...args) {
        let curTime = Date.now()
        let remaining = delay - (curTime - startTime)
        const context = this
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            startTime = Date.now()
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }
    }
}

const fn = throttle((a, b) => {
    console.log(a + b)
}, 1000)

fn(1, 2)
fn(2, 3)
fn(3, 4)
setTimeout(() => {
    fn(4, 5)
}, 1000)