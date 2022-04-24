<template>
    <slot-container>
        <template v-slot:header>
            <router-link to="/">Home</router-link>
            <router-link to="/page2">Page2</router-link>
        </template>
        <template v-slot:left-content>
            这是左边
        </template>
        <template v-slot:right-content>
            这是左边
        </template>
    </slot-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlotContainer from '@/components/slot-container.vue';

@Component({
    components: {
        SlotContainer
    }
})
export default class extends Vue {

}
</script>

<style scoped>
</style>