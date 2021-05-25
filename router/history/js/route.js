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
        this.bindEvent()
        window.addEventListener('load', this.updateView())
        window.addEventListener('popstate', this.updateView())
    }
    bindEvent() {
        const links = document.getElementsByTagName('a');
        [].forEach.call(links, link => {
            link.addEventListener('click', () => {
                let url = link.getAttribute('data-href')
                this.push(url)
            })
        })
    }
    updateView() {
        let path = window.location.pathname || '/'
        this.routes[path] && this.routes[path]()
    }
    push(url) {
        window.history.pushState({}, null, url)
        this.updateView()
    }
    route(path, cb) {
        this.routes[path] = cb
    }
}

export default Route