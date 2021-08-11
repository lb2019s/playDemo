<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        componentName: 'KForm',
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            rules: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        created() {
            this.fileds = []
            this.$on('form.addItem', item => {
                this.fileds.push(item)
            })
        },
        methods: {
            validate(cb) {
                // let tasks = this.$children
                // .filter(item => item.prop)
                // .map(item => item.validator())

                let tasks = this.fileds.map(item => item.validator())

                Promise.all(tasks)
                .then(() => {
                    cb(true)
                })
                .catch(() => {
                    cb(false)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>