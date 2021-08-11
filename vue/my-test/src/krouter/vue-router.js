import View from './view'
import Link from './link'

let Vue

class KVueRouter {
    constructor(options) {
        this.$options = options
        this.routeMap = {}
        options.routes.forEach(route => {
            this.handleRoute(route)
        })
        Vue.util.defineReactive(this, 'current')
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange() {
        this.current = window.location.hash.slice(1)
    }
    handleRoute(route) {
        let { path, component } = route
        this.routeMap[path] = component
    }
}

KVueRouter.install = function(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link', Link)

    Vue.component('router-view', View)
}

export default KVueRouter