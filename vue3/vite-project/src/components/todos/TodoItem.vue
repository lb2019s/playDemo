<template>
    <li :class="{ edit: todo === editTodo }" v-bind="$attrs">
        <div class="view">
            <input type="checkbox" v-model="todo.completed" />
            <label
                :class="{ completed: todo.completed }"
                @dblclick="handleEdit(todo)"
            >{{ todo.title }}</label>
            <button @click="deleteTodo(todo)">X</button>
        </div>
        <EditTodo
            class="input"
            v-focus
            v-model="todo.title"
            @keyup.enter="doneTodo"
            @blur="doneTodo"
            @keyup.esc="cancelTodo(todo)"
        ></EditTodo>
    </li>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    props: {
        todo: {
            type: Object,
            require: true
        },
        editTodo: Object
    },
    emits: ['delete-todo', 'update:edit-todo'],
    directives: {
        focus: (el) => {
            el.focus();
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            prevTodoCache: "",
        })

        function handleEdit(todo) {
            state.prevTodoCache = todo.title;
            emit('update:edit-todo', todo)
        }


        function doneTodo() {
            emit('update:edit-todo', null)
        }

        function cancelTodo(todo) {
            todo.title = state.prevTodoCache;
            emit('update:edit-todo', null)
        }

        function deleteTodo(todo) {
            emit('delete-todo', todo)
        }

        return {
            ...toRefs(state),
            handleEdit,
            doneTodo,
            cancelTodo,
            deleteTodo
        }
    }
}
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}

.input,
.edit .view {
    display: none;
}

.view,
.edit .input {
    display: block;
}
</style>