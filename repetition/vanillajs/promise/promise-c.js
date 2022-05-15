// repeat 2

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    ONFULFILLED_CALLBACK_LIST = []
    ONREJECTED_CALLBACK_LIST = []
    constructor(execute) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        try {
            execute(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    get status() {
        return this._status
    }
    set status(newStatus) {
        this._status = newStatus
        switch (newStatus) {
            case FULFILLED: {
                this.ONFULFILLED_CALLBACK_LIST.forEach(cb => cb(this.value))
                break
            }
            case REJECTED: {
                this.ONREJECTED_CALLBACK_LIST.forEach(cb => cb(this.reason))
            }
        }
    }
    resolve(value) {
        if (this.status !== PENDING) return
        this.value = value
        this.status = FULFILLED
    }
    reject(reason) {
        if (this.status !== PENDING) return
        this.reason = reason
        this.status = REJECTED
    }
    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => value
        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason }
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                this.ONFULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
                this.ONREJECTED_CALLBACK_LIST.push(rejectedMicrotask)
            }
        })
        return promise2
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new TypeError('the promise and the return val are the same'))
        }
        if (x instanceof MyPromise) {
            queueMicrotask(() => {
                x.then(
                    y => {
                        this.resolvePromise(promise2, y, resolve, reject)
                    },
                    reject
                )
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x)
            }
            let then = null
            try {
                then = x.then
            } catch (error) {
                reject(error)
            }
            if (this.isFunction(then)) {
                let called = false
                try {
                    then.call(
                        x,
                        y => {
                            if (called) return
                            called = true
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        r => {
                            if (called) return
                            called = true
                            reject(r)
                        })
                } catch (error) {
                    if (called) return
                    reject(error)
                }
            } else {
                resolve(x)
            }

        } else {
            resolve(x)
        }
    }
    isFunction(target) {
        return typeof target === 'function'
    }
}

// const test = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 500)

//     console.log('start')
// })
// test.then(value => console.log(value), reason => console.log('-----', reason))
// test.then(value => console.log(value), reason => console.log('-----', reason))
// test.then(value => console.log(value), reason => console.log('-----', reason))

// promises-aplus-tests 测试需要实现静态方法 deferred

MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}

module.exports = MyPromise