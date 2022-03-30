<template>
    <input type="text" :value="modelValue" @input="onInputChange" v-bind="$attrs" />
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInputChange(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    },
}
</script>

<style lang="scss" scoped>
</style>