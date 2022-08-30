// repeat 3

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class Promise {
    ONFULFILLED_CALLBACK_LIST = []
    ONREJECTED_CALLBACK_LIST = []
    constructor(fn) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
    }

    get status() {
        return this._status
    }

    set status(newStatus) {
        switch (newStatus) {
            case FULFILLED: {
                this.ONFULFILLED_CALLBACK_LIST.forEach(cb => cb(this.value))
                break
            }
            case REJECTED: {
                this.ONREJECTED_CALLBACK_LIST.forEach(cb => cb(this.reason))
            }
        }
        this._status = newStatus
    }

    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : value => value
        const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => { throw reason }
        const promise2 = new Promise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        console.error(error)
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
                        console.error(error)
                        reject(error)
                    }
                })
            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else {
                this.ONFULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
                this.ONREJECTED_CALLBACK_LIST.push(rejectedMicrotask)
            }
        })
        return promise2
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (x === promise2) {
            reject(new TypeError('the promise and the return value are the same'))
        }
        if (x instanceof Promise) {
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
                return reject(error)
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
                        }
                    )
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

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(callback) {
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            reason => Promise.resolve(callback()).then(() => { throw reason })
        );
    };

    isFunction(target) {
        return typeof target === 'function'
    }
    static resolve(value) {
        if (value instanceof Promise) {
            return value
        }
        return new Promise(resolve => resolve(value))
    }
}

const p1 = new Promise((resolve, reject) => {
    resolve(1)
})

const p2 = new Promise((resolve, reject) => {
    reject(2)
})
p1.then((value) => console.log(value))
let p3 = p2.then(0, (reason) => {
    console.log(reason)
    return reason
}).then((value) => {
    console.log('-->', value)
    throw 'wa shi da ha ha'
}).catch(error => {
    console.log('catch', error)
    return 'catch return'
}).finally(() => {
    console.log('finally')
    throw 'finally error'
})

p3.then((value) => {
    console.log('resolve', value)
}, (reason) => {
    console.log('reject', reason)
})

Promise.deferred = function () {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}

module.exports = Promise