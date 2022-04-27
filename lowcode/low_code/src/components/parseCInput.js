
import CInput from "./CInput.vue"
export default {
  name: 'CInput',
  components: {
    CInput
  },
  props: {},
  render(h) {
    const _this = this
    const props = {
      nativeOn: {
        click: (event) => {
          event.preventDefault()
          event.stopPropagation()
          _this.$emit('pickType', 'CInput')
        }
      }
    }
    return <CInput {...props}></CInput>
  }
}
