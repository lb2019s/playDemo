function compose(middleware) {
    return function (next) {
        dispatch(0)
        function dispatch(i) {
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}
function fn3(next) {
    console.log("fn3");
    next()
    console.log('end fn3')
}
function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}
const middleware = [fn1, fn2, fn3];
const finalFn = compose(middleware);
finalFn(() => { })