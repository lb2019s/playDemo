<template lang="">
    <div @click="$emit('update:counter', counter + 1)">
        counter {{counter}}
    </div>
</template>
<script>
export default {
    props: {
        counter: Number
    }
}
</script>
<style lang="">
    
</style>