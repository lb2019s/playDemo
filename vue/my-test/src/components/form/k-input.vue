<template>
    <div>
        <input :type="type" @input="handleInput" v-bind="$attrs">
    </div>
</template>

<script>
    import emitter from '@/mixins/emitter'
    export default {
        mixins: [emitter],
        inheritAttrs: false,
        props: {
            type: {
                type: String,
                default: 'text'
            }
        },
        methods: {
            handleInput(e) {
                this.$emit('input', e.target.value)
                this.dispatch('KFormItem', 'valid')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>