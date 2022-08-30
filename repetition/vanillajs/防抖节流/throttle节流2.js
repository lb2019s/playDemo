function throttle(fn, delay = 300) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay)
        }
    }
}

const fn = throttle((a, b) => {
    console.log(a + b)
}, 300)

fn(1, 2)
fn(2, 3)
fn(3, 4)
setTimeout(() => {
    fn(4, 5)
}, 1000)