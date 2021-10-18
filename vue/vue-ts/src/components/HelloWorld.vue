<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div><input type="text" @keyup.enter="addFeature" /></div>
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{ selected: feature.selected }"
      >
        {{ feature.name }}
      </li>
      <li>total: {{total}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeatureSelect } from "@/types";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  features: FeatureSelect[] = [];

  async created() {
    const resp = await this.$axios.get<FeatureSelect[]>('/api/list')
    this.features = resp.data
    console.log(resp);
    
  }

  addFeature(e: KeyboardEvent) {
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false,
    };
    this.features.push(feature);
    inp.value = "";
  }

  get total() {
    return this.features.length
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.selected {
  background-color: rgb(228, 226, 120);
}
</style>
