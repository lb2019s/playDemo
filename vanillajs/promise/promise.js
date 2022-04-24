const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    FULFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []
    constructor(fn) {
        this.status = PENDING
        this.value = null
        this.reason = null
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
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
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value)
                })
                break
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason)
                })
                break
            }
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
    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : value => { return value }
        const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => { throw reason }

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
                fulfilledMicrotask(this.value)
            } else if (this.status === REJECTED) {
                rejectedMicrotask(this.reason)
            } else if (this.status === PENDING) {
                this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
                this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask)
            }
        })
        return promise2
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('the promise and the return value are the same'))
        }

        if (x instanceof MyPromise) {
            queueMicrotask(() => {
                x.then(
                    y => {
                        this.resolve(premise2, y, resolve, reject)
                    },
                    reject
                )
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(null)
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
                            if (called) {
                                return
                            }
                            called = true
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        r => {
                            if (called) {
                                return
                            }
                            called = true
                            reject(r)
                        }
                    )
                } catch (error) {
                    if (called) {
                        return
                    }
                    reject(error)
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }
    }
    finally(callback) {
        return this.then(
            (value) => MyPromise.resolve(callback()).then(() => value),
            (reason) => MyPromise.resolve(callback()).then(() => { throw reason })
        )
    }
    isFunction(fn) {
        return typeof fn === 'function'
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise(resolve => resolve(value))
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason))
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('must be a array'))
            }
            let count = 0
            let res = []
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i])
                    .then((value) => {
                        count++
                        res[i] = value
                        if (count === promises.length) {
                            resolve(res)
                        }
                    })
                    .catch(reject)
            }
        })
    }
}

MyPromise.all([1, 2, MyPromise.resolve(1212)]).then(console.log)