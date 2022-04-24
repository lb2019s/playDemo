<template>
    <div class="detail">
        <h3>Detail {{ content }}</h3>
        <router-link to="/list">to list</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class Detail extends Vue {
    get content() {
        return this.$route.params.id
    }
}
</script>

<style scoped>
.detail {
    width: 100%;
}
</style>