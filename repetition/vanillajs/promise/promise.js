// repeat 4
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class Promise {
    ON_FULFILLED_CALLBACK = []
    ON_REJECTED_CALLBACK = []
    constructor(fn) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            reject(error)
        }
    }
    get status() {
        return this._status
    }

    set status(newStatus) {
        switch (newStatus) {
            case FULFILLED: {
                this.ON_FULFILLED_CALLBACK.forEach(cb => cb(this.value))
                break
            }
            case REJECTED: {
                this.ON_REJECTED_CALLBACK.forEach(cb => cb(this.reason))
                break
            }
        }
        this._status = newStatus
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

    then(onFulfilled, onRejected) {
        onFulfilled = this.isFunction(onFulfilled) ? onFulfilled : value => value
        onRejected = this.isFunction(onRejected) ? onRejected : reason => { throw reason }
        const promise2 = new Promise((resolve, reject) => {
            const realOnFulfilled = () => {
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            const realOnRejected = () => {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === FULFILLED) {
                realOnFulfilled()
            } else if (this.status === REJECTED) {
                realOnRejected()
            } else if (this.status === PENDING) {
                this.ON_FULFILLED_CALLBACK.push(realOnFulfilled)
                this.ON_REJECTED_CALLBACK.push(realOnRejected)
            }
        })
        return promise2
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (x === promise2) {
            return reject(new TypeError('the promise and the return value are the same'))
        }

        if (x instanceof Promise) {
            queueMicrotask(() => {
                x.then(
                    y => this.resolvePromise(promise2, y, resolve, reject),
                    reject
                )
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x)
            }
            let then
            try {
                then = x.then
            } catch (error) {
                return reject(error)
            }
            if (this.isFunction(then)) {
                let called = false
                try {
                    then.call(x,
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
        )
    }

    isFunction(target) {
        return typeof target === 'function'
    }
}


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hi heihei')
    })
}).then((value) => {
    console.log('then value', value)
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