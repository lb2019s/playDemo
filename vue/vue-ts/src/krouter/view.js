export default {
    render(h) {
        this.$vnode.data.routerView = true
        let deep = 0
        let parent = this.$parent
        while(parent) {
            let vnodeData = parent.$vnode && parent.$vnode.data
            if (vnodeData && vnodeData.routerView) {
                deep++
            }
            parent = parent.$parent
        }
        let component = null
        let route = this.$router.matched[deep]
        if (route) {
            component = route.component
        }
        // let route = this.$router.$options.routes.find(route => route.path === this.$router.current)
        return h(component)
    }
}