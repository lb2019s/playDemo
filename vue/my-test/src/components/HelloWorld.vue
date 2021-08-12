<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3 :class="$style.h3">Ecosystem</h3>
    <p @click="$store.commit('add')">{{$store.state.count}}</p>
    <p @click="$store.dispatch('add')">{{$store.state.count}}</p>
    <p>{{$store.getters.dubboCount}}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>

<style module>
h3 {
  margin: 40px 0 0;
  color: aqua;
}
</style>
