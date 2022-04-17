// koa
function compose_koa(middleware) {
    return function (next) {
        return dispatch(0)
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

// redux
function compose_redux(...funcs) {
    if (funcs.length === 0) {
        return (args) => args
    }
    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
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
const finalFn = compose_koa(middleware);
// finalFn(() => { console.log('next') });


function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}
const a = compose_redux(fn1, fn2, fn3, fn4);
console.log(a(1));