<template>
    <div class="slot-container">
        <div class="top">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <div class="left-content">
                <slot name="left-content"></slot>
            </div>
            <div class="right-content">
                <slot name="right-content"></slot>
            </div>
        </div>
        <div class="footer">
            <slot name="footer">默认底部文字</slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

}
</script>

<style scoped lang="less">
.slot-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: aquamarine;
        height: 100px;
    }

    .content {
        flex: 1;
        display: flex;

        .left-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: tan;
            height: 100%;
        }

        .right-content {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            background: thistle;
            height: 100%;
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background: silver;
        height: 100px;
    }
}
</style>