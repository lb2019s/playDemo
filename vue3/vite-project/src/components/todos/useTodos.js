import { ref, watchEffect } from 'vue'
const todoStorage = {
    fetch() {
        return JSON.parse(localStorage.getItem('todos') || '[]')
    },
    save(todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

export default function useTodos(state) {
    const todos = ref(todoStorage.fetch())
    function addTodo() {
        todos.value.push({
            id: todos.value.length,
            title: state.newTodo,
            completed: false,
        });
        state.newTodo = "";
    }
    function deleteTodo(todo) {
        todos.value.splice(todos.value.indexOf(todo), 1);
    }
    watchEffect(() => todoStorage.save(todos.value));
    return {
        todos,
        addTodo,
        deleteTodo
    }
}