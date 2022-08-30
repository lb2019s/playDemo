function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args
    }
    if (funcs.length === 1) {
        return funcs[0]
    }

    // return funcs.reduce((a, b) => (...args) => a(b(...args)))
    return (args) => funcs.reduce((a, b) => b(a), args)
}

function fn1(x) {
    console.log('1')
    return x + 1;
}
function fn2(x) {
    console.log('2')
    return x + 2;
}
function fn3(x) {
    console.log('3')
    return x + 3;
}
// function fn1(next) {
//     return (x) => {
//         console.log('1')
//         next(x + 1)
//         console.log('end 1')
//     };
// }
// function fn2(next) {
//     return (x) => {
//         console.log('2')
//         next(x + 2)
//         console.log('end 2')
//     };
// }
// function fn3(next) {
//     return (x) => {
//         console.log('3')
//         next(x + 3)
//         console.log('end 3')
//     };
// }
// const a = compose(fn1, fn2, fn3)((res) => { console.log('dispatch'); return res });
// console.log(a(1));

compose(fn1, fn2, fn3)()