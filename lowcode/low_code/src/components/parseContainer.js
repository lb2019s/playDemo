
import Container from "./Container.vue"
export default {
  name: 'CContainer',
  components: {
    Container
  },
  props: {},
  render(h, section, children) {
    const _this = this
    const _props = {
      props: {
        schema: section
      },
      on: {
        drop: _this.handleDrop
      },
      nativeOn: {
        click: (event) => {
          event.preventDefault()
          event.stopPropagation()
          _this.$emit('pickType', 'CContainer')
        }
      }
    }
    return (
      <Container {..._props}>{children}</Container>
    )
  }
}
