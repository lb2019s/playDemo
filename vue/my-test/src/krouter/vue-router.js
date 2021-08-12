import View from './view'
import Link from './link'

let Vue

class KVueRouter {
    constructor(options) {
        this.$options = options
        this.routeMap = {}
        // options.routes.forEach(route => {
        //     this.handleRoute(route)
        // })
        // Vue.util.defineReactive(this, 'current')
        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', [])
        this.match()
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange() {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }
    handleRoute(route) {
        let { path, component } = route
        this.routeMap[path] = component
    }
    match(routes) {
        routes = routes || this.$options.routes
        for ( const route of routes ) {
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }

            if (route.path !== '/' && this.current.includes(route.path)) {
                this.matched.push(route)
                if (route.children) {
                    this.match(route.children)
                }
            }
        }
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