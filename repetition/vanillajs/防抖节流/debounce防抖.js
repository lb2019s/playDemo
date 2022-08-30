function debounce(fn, delay = 300) {
    let timer = null
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const fn = debounce((a, b) => {
    console.log(a + b)
})

fn(1, 2)

setTimeout(() => {
    fn(2, 3)
}, 100)
setTimeout(() => {
    fn(3, 4)
}, 200)
setTimeout(() => {
    fn(5, 6)
}, 400)

setTimeout(() => {
    fn(6, 7)
}, 800)
