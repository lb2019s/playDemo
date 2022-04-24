<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/list">List</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class HomeView extends Vue { }
</script>
