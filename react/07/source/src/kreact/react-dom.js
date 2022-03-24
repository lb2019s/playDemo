import { TEXT } from "./const";

function render(vnode, container) {
    // console.log(vnode, container);
    const node = createNode(vnode)
    container.appendChild(node)
}

function createNode(vnode) {
    // console.log('vnode', vnode)
    const { type, props } = vnode
    let node = null
    if (type === TEXT) {
        node = document.createTextNode("")
    } else if (typeof type === 'string') {
        node = document.createElement(type)
    } else if (typeof type === 'function') {
        node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    } else {
        node = document.createDocumentFragment()
    }
    reconcileChildren(props.children, node)
    updateNode(node, props)
    return node
}

function updateClassComponent(vnode) {
    const { type, props } = vnode
    const cmpt = new type(props)
    const vvnode = cmpt.render()
    return createNode(vvnode)
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode
    const vvnode = type(props)
    return createNode(vvnode)
}

function updateNode(node, props) {
    Reflect.ownKeys(props)
        .filter(key => key !== 'children')
        .forEach(key => {
            if (key === 'style') {
                const obj = props[key]
                node[key] = Reflect.ownKeys(obj).map(style => `${style}:${obj[style]}`).join(';')
                return
            }
            node[key] = props[key]
        })
}

function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (Array.isArray(child)) {
            child.forEach(item => render(item, node))
        } else {
            render(child, node)
        }

    }

}

export default {
    render
}