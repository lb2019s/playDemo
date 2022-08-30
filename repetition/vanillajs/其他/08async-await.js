function test(data) {
    return new Promise(resolve => setTimeout(() => resolve(data), 300))
}

function* generator() {
    const data = yield test(1);
    console.log(data);
    console.log(2);
    const data2 = yield 3;
    console.log(data2)
    console.log(4);
}

function asyncToGenerator(genFn) {
    return function () {
        return new Promise((resolve, reject) => {
            const gen = genFn.apply(this, arguments)
            function step(key, arg) {
                let next
                try {
                    next = gen[key](arg)
                } catch (error) {
                    reject(error)
                }

                if (next.done) {
                    return resolve(next.value)
                }

                Promise.resolve(next.value).then(
                    value => step('next', value),
                    reason => step('throw', reason)
                )
            }
            step('next')
        })
    }
}

asyncToGenerator(generator)()