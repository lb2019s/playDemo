<template>
  <el-button>{{ message }}</el-button>
</template>

<script>
export default {
  name: 'CButton',
  props: {},
  data() {
    return {
      message: '按钮'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
