<template>
  <div>
    <slot-comp>
      <p>我是新的上</p>
      <template v-slot:head>新的头</template>
      <p>我是新的中</p>
      <template v-slot:footer="{msg}">新的{{msg}}</template>
      <p>我是新的下</p>
    </slot-comp>
  </div>
</template>

<script>
  import SlotComp from './slot.vue'
  export default {
    components: {
      SlotComp
    }
  }
</script>

<style lang="scss" scoped>

</style>