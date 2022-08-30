<template>
    <div>
        <button @click="showModal">打开弹框</button>
        <modal title="提示" :visible="visible" v-if="visible">
            <span>content</span>
            <template v-slot:footer>
                <button @click="handleOk">取消</button>
                <button @click="handleCancel">确认</button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from './component/Modal/modal.vue'
export default {
    components: {
        Modal
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        showModal() {
            this.visible = true
        },
        handleOk() {
            this.visible = false
        },
        handleCancel() {
            this.visible = false
        }
    }
}
</script>

<style lang="less" scoped>
</style>