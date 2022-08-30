<template>
<div class="modal-mark" v-show="visible">
    <div class="dialog">
        <div class="header">{{title}}</div>
        <div class="content">
            <slot name="default"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        document.body.appendChild(this.$el)
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>

<style lang="less" scoped>
.modal-mark {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #00000036;
    .dialog {
         margin-top: 100px;
        width: 500px;
        background-color: #fff;

        .header {
            padding-left: 10px;
            height: 60px;
            font-size: 22px;
            font-weight: bold;
            line-height: 60px;
        }

        .content {
            padding: 10px 6px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }

        .footer {
            height: 60px;
            line-height: 60px;
            text-align: right;

            button {
                margin: 0 4px;
                padding: 4px 6px;
                background-color: #fff;
                border: 1px solid #eee;
                cursor: pointer;

                &:hover {
                    background-color: #eee3ef;
                }
            }
        }
    }
}
</style>