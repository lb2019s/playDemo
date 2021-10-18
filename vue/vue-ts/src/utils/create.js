
import Notice from '@/components/common/notice'

function create(Vue,compont, props) {
    const Ctor = Vue.extend(compont)

    const comp = new Ctor({ propsData: props })
    comp.$mount()
    document.body.appendChild(comp.$el)

    comp.remove = function() {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }

    // const vm = new Vue({
    //     render: h => h(compont, { props })
    // }).$mount()

    // document.body.appendChild(vm.$el)

    // const comp = vm.$children[0]

    // comp.remove = function() {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }


    return comp
}

export default {
    install(Vue) {
        Vue.prototype.$notice = function(options) {
            return create(Vue, Notice, options)
        }
    }
}