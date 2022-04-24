<template>
  <div class="list">
    <h3>List page</h3>
    <router-link to="/">Home</router-link>
    <div v-for="item in list" :key="item" class="item">
      <router-link :to="item">{{ item }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class HomeView extends Vue {
  get list() {
    return Array.from({ length: 100 }).map((_, index) => '/detail/' + index)
  }
}
</script>

<style lang="less">
.list {
  width: 100%;

  .item {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>