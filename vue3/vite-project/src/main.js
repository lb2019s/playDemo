import { createApp } from 'vue'
import App from './App.vue'
import EditTodo from './components/todos/EditTodo.vue'

createApp(App)
    .component('EditTodo', EditTodo)
    .directive('highlight', {
        beforeMount(el, binding, vnode) {
            el.style.background = binding.value
        }
    })
    .mount('#app')
