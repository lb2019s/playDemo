
import CButton from "./CButton.vue"
export default {
  name: 'CButton',
  components: {
    CButton
  },
  props: {},
  render(h) {
    const _this = this
    const props = {
      nativeOn: {
        click: (event) => {
          event.preventDefault()
          event.stopPropagation()
          _this.$emit('pickType', 'CButton')
        }
      }
    }
    return <CButton {...props}></CButton>
  }
}
