export default {
    render(h) {
        const { routeMap, current } = this.$router
        // let route = this.$router.$options.routes.find(route => route.path === this.$router.current)
        return h(routeMap[current])
    }
}