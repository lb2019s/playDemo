let Vue

class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters
        
        this.getters = {}
        let computed = {}
        const store = this
        Object.keys(store._wrappedGetters).forEach(key => {
            const fn = store._wrappedGetters[key]
            computed[key] = function() {
                return fn(store.state)
            }
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key],
                enumerable: true
            })
        })

        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        })
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.error('直接修改state')
    }

    commit(type, payload) {
        let entry = this._mutations[type]
        if (entry) {
            entry(this.state, payload)
        }
    }

    dispatch(type, payload) {
        let entry = this._actions[type]
        if (entry) {
            entry(this, payload)
        }
    }
}

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


export default {
    Store,
    install
}