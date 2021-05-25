class Route {
    constructor(options, container) {
        this.routes = {}
        options.forEach(({path, component}) => {
            this.route(path, () => {
                container.innerHTML = component
            })
        })
        this.init()
    }
    init() {
        window.addEventListener('load', this.updateView.bind(this))
        window.addEventListener('hashchange', this.updateView.bind(this))
    }
    updateView() {
        let path = window.location.hash.slice(1) || '/'
        this.routes[path] && this.routes[path]()
    }
    route(path, cb) {
        this.routes[path] = cb
    }
}

export default Route