<template>
    <div v-if="isShow" class="modal">
        <h3>{{title}}</h3>
        <p>{{message}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            },
            message: {
                type: String
            },
            duration: {
                type: Number,
                default: 1000
            }
        },
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            show() {
                this.isShow = true
                setTimeout(this.hide, this.duration)
            },
            hide() {
                this.isShow = false
                this.remove()
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 200px;
    background: cornsilk;
    text-align: center;
}
</style>