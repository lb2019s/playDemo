
<script>
import { configs } from "../config"
export default {
    name: 'ConfigPanel',
    props: {
        currentType: {
            type: String,
            default: ''
        }
    },
    components: {
        ...configs
    },
    methods: {
        renderPanel(h, type) {
            if (!type) return null
            const components = this.$options.components
            return components[type]?.render.call(this, h)
        }
    },
    render(h) {
        const _type = this.currentType
        return this.renderPanel(h, _type)
    }
}
</script>

<style lang="less" scoped>
</style>