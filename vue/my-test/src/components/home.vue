<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <slot-test></slot-test> -->
    <k-form></k-form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import SlotTest from './components/slots/index.vue'
import KForm from './form/index.vue'

export default {
  name: 'App',
  components: {
    KForm
  }
}
</script>

<style>
</style>
