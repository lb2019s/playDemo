<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
    import Schema from 'async-validator'
    import emitter from '@/mixins/emitter'
    export default {
        componentName: 'KFormItem',
        mixins: [emitter],
        inject: ['form'],
        data() {
            return {
                error: ''
            }
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        mounted() {
            this.$on('valid', () => {
                this.validator()
            });
            if (this.prop) {
                this.dispatch('KForm', 'form.addItem', [this])
            }
        },
        methods: {
            validator() {
                let prop = this.prop
                let rules = this.form.rules[prop]
                let value = this.form.model[prop]
                
                let desc = { [prop]: rules }

                let schema = new Schema(desc)
                return schema.validate({ [prop]: value }, errors => {
                    if (errors) {
                        this.error = errors[0].message
                    } else {
                        this.error = ''
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>