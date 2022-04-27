<template>
    <div class="container" @dragover.prevent @drop.stop="handleDrop">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CContainer',
    props: {
        schema: Object
    },
    methods: {
        handleDrop(event) {
            this.$emit('drop', event, this)
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    margin: 10px 0;
    width: 100%;
    min-height: 100px;
    // display: flex;
    background: var(--mainBg);
    border: 1px solid var(--mainLine);
}
</style>