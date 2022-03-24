import { PLACEMENT, TEXT } from "./const";

let nextUintWork = null
let wipRoot = null

function render(vnode, container) {
    console.log(vnode, container);
    // const node = createNode(vnode)
    // container.appendChild(node)
    wipRoot = {
        node: container,
        props: {
            children: [vnode]
        }
    }
    nextUintWork = wipRoot
}

function createNode(vnode) {
    // console.log('vnode', vnode)
    const { type, props } = vnode
    let node = null
    if (type === TEXT) {
        node = document.createTextNode("")
    } else if (typeof type === 'string') {
        node = document.createElement(type)
    } else {
        // node = document.createDocumentFragment()
        node = new DocumentFragment()
    }
    // reconcileChildren(props.children, node)
    updateNode(node, props)
    return node
}

function updateClassComponent(fiber) {
    const { type, props } = fiber
    const cmpt = new type(props)
    const vnode = cmpt.render()
    reconcileChildren(fiber, [vnode])
}

function updateFunctionComponent(fiber) {
    const { type, props } = fiber
    const vnode = type(props)
    reconcileChildren(fiber, [vnode])
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

function reconcileChildren_old(children, node) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (Array.isArray(child)) {
            child.forEach(item => render(item, node))
        } else {
            render(child, node)
        }

    }

}


function reconcileChildren(workInProcessFiber, children) {
    let preSibling = null
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            children.splice(i, 1, ...children[i])
        }

        const child = children[i]
        const newFiber = {
            type: child.type,
            props: child.props,
            node: null,
            base: null,
            child: null,
            sibling: null,
            return: workInProcessFiber,
            effectTag: PLACEMENT
        }

        if (i === 0) {
            workInProcessFiber.child = newFiber
        } else {
            preSibling.sibling = newFiber
        }
        preSibling = newFiber
    }
}

function updateHostComponent(fiber) {
    if (!fiber.node) {
        fiber.node = createNode(fiber)
    }
    // 协调子元素
    const { children } = fiber.props
    reconcileChildren(fiber, children)
    console.log('fiber', wipRoot)
}

function preformUnitWork(fiber) {
    // 执行当前任务
    const { type } = fiber
    if (typeof type === 'function') {
        type.prototype.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    // 寻找下一个任务
    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }

        nextFiber = nextFiber.return
    }
}

function workLoop(deadline) {
    while (nextUintWork && deadline.timeRemaining() > 1) {
        nextUintWork = preformUnitWork(nextUintWork)
    }
    if (!nextUintWork && wipRoot) {
        // 提交
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

function commitRoot() {
    commitWorker(wipRoot.child)
    wipRoot = null
}

function commitWorker(fiber) {
    if (!fiber) return

    let parentFiber = fiber.return
    while (!parentFiber.node) {
        parentFiber = parentFiber.return
    }

    const parentNode = parentFiber.node
    if (fiber.effectTag === PLACEMENT && fiber.node) {
        if (fiber.type === 'template' || fiber.type === undefined) {
            commitWorker(fiber.child)
        }
        parentNode.appendChild(fiber.node)
    }
    if (fiber.type && fiber.type !== 'template') {
        commitWorker(fiber.child)
    }

    commitWorker(fiber.sibling)
}

requestIdleCallback(workLoop)

export default {
    render
}