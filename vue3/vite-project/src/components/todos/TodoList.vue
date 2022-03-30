<template>
    <div>
        <EditTodo
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="新增todo"
            autofocus
            autocomplete="false"
        ></EditTodo>
        <ul>
            <TodoItem
                v-for="todo in filterTodos"
                :key="todo.id"
                :todo="todo"
                v-model:edit-todo="editTodo"
                @delete-todo="deleteTodo"
            ></TodoItem>
        </ul>

        <Filter :items="filterItems" v-model="visibility"></Filter>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import TodoItem from "./TodoItem.vue";
import Filter from "./Filter.vue";
import useTodos from './useTodos'
import useFilter from './useFilter'

export default {
    components: { TodoItem, Filter },
    setup() {
        const state = reactive({
            newTodo: "",
            editTodo: null,
        })
        const { todos, addTodo, deleteTodo } = useTodos(state)
        const filterState = useFilter(todos.value)
        return {
            ...toRefs(state),
            ...toRefs(filterState),
            addTodo,
            deleteTodo,
        };
    },
};
</script>

<style scoped>
</style>