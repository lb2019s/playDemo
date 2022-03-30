<template>
    <div class="filters">
        <span
            v-for="item in items"
            @click="$emit('update:modelValue', item.value)"
            :class="{ selected: modelValue === item.value }"
            :key="item.value"
        >{{ item.label }}</span>
    </div>
</template>

<script>
export default {
    props: ['items', 'modelValue'],
    emits: ['update:modelValue']
}
</script>

<style scoped>
.filters span {
    padding: 2px 4px;
    margin: 0px 2px;
    border: 1px solid transparent;
}

.filters span.selected {
    border: 1px solid rgb(46, 43, 43);
}
</style>