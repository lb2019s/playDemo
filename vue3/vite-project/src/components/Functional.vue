<script>
import { h } from "@vue/runtime-core";

function Heading(props, context) {
    return h(`h${props.level}`, context.attrs, context.slots)
}

Heading.props = ['level']

export default Heading
</script>