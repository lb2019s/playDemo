import { reactive, computed } from 'vue'
const filters = {
    all(todos) {
        return todos
    },
    active(todos) {
        return todos.filter(item => !item.completed)
    },
    completed(todos) {
        return todos.filter(item => item.completed)
    }
}

export default function useFilter(todos) {
    const filterState = reactive({
        filterItems: [
            { label: 'All', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
        ],
        visibility: "all",
        filterTodos: computed(() => filters[filterState.visibility](todos))
    });
    return filterState
}