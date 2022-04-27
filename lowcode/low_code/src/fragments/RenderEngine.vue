<script>
import { parses } from "../components/"
export default {
    name: 'RenderEngine',
    props: {
        schema: {
            type: Object,
            default: () => { }
        },
        addType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: undefined
        }
    },
    components: {
        ...parses
    },
    methods: {
        renderRoot(h) {
            const _page = this.page
            return (
                <div class="root">
                    {this.renderComponent(h, _page)}
                </div>
            )
        },
        renderComponent(h, section) {
            let _children = null
            if (section.children) {
                _children = this.renderChildren(h, section)
            }
            return this.startRender(h, section, _children)
        },
        renderChildren(h, section) {
            let node_arr = section.children || [].concat(section)

            return node_arr.map((n, i) => this.renderComponent(h, n))
        },
        startRender(h, section, children) {
            const _type = section.type
            const renderMod = parses[_type]
            if (renderMod) {
                return renderMod.render.call(this, h, section, children)
            }
            return null
        },
        handleDrop(event, vm) {
            event.preventDefault()
            let _schema = vm.schema
            if (!_schema.children) {
                this.$set(_schema, 'children', [])
            }
            _schema.children.push({
                type: this.addType
            })
        }
    },
    created() {
        this.page = this.schema.page || {}
    },
    render(h) {
        return this.renderRoot(h)
    },
}
</script>

<style lang="scss" scoped>
</style>