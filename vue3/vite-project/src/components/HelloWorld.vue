<template>
  <button>{{count}}</button>
  <p>{{doubleCount}}</p>
  <h3>{{message}}</h3>
  <code ref="code"></code>
  <ModalButton></ModalButton>
  <VModule v-model:counter="counter"></VModule>
  <RenderTest v-model:counter="counter">
    <template v-slot:default>
      <div>
        title
      </div>
    </template>
    <template v-slot:content>
      <div>
        content
      </div>
    </template>
  </RenderTest>
  <Heading level="3"> i am function component h3 </Heading>
  <Heading level="2"> i am function component h2 </Heading>
  <p v-highlight="'green'">highlight directive</p>
</template>

<script>
import { computed, h, onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue"
import ModalButton from "./ModalButton.vue"
import VModule from "./VModule.vue"
import Heading from "./Functional.vue"
export default {
  components: {
    ModalButton,
    VModule,
    Heading,
    RenderTest: {
      props: {
        counter: {
          type: Number,
          default: 0
        },
      },
      render() {
        return h('div', {
          onClick: this.handleClick
        }, [
          `i am render counter: ${this.counter}`,
          this.$slots.default(),
          this.$slots.content()
        ])
      },
      methods: {
        handleClick() {
          this.$emit('update:counter', this.counter + 1)
        }
      },
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  setup() {
   const { count, doubleCount } = useCounter()
   const message = ref('hello')
   const code = ref(null)
   watch(count, (val, oldVal) => {
     const node = code.value
     node.textContent = `count from ${oldVal} to ${val}`
   })
   return {count, doubleCount, message, code}
  }
}
function useCounter() {
 const data = reactive({
      count: 1,
      doubleCount: computed(() => data.count * 2)
    })
    let timer = null
    onMounted(() => {
      timer = setInterval(() => {
        data.count++
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return toRefs(data)
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
