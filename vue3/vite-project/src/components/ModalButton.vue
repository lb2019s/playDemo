<template>
<div>
  <button @click="visible = true">打开模态框</button>
  <teleport to="body">
      <div class="modal" v-if="visible">
          <h3>弹框</h3>
          <p>我的父亲是body</p>
          <button @click="visible = false">关闭</button>
      </div>
  </teleport>
</div>
</template>

<script>
export default {
    data() {
        return {
        visible: false
        }
    }
}
</script>

<style>
.modal {
    width: 300px;
    height: 200px;
    text-align: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 1px solid black;
    background: white;
}
</style>