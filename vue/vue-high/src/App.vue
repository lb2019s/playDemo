<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Watch, Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component({})
export default class App extends Vue {
  public transitionName = ''
  @Watch('$route')
  onRouteChange(to: Route, from: Route) {
    this.transitionName = to!.meta!.depth > from!.meta!.depth ? 'slide-left' : 'slide-right'
    console.log(this.transitionName)
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 350ms;
  position: absolute;
  overflow: hidden;
}

.slide-right-enter,
.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
