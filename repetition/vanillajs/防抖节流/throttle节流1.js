function throttle(fn, delay = 300) {
    // let now = Date.now()
    let now = 0
    return function (...args) {
        if (Date.now() - now >= delay) {
            fn.apply(this, args)
            now = Date.now()
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