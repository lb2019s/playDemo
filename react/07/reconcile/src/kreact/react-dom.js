import { DELETION, PLACEMENT, TEXT, UPDATE } from "./const";

let nextUintWork = null
let wipRoot = null
let currentRoot = null

// work in process fiber
let wipFiber = null

let deletions = []

/**
 * fiber架构
 * type: 标记类型
 * key: 标记当前层级下的唯一性
 * child : 第一个子元素 fiber
 * sibling ： 下一个兄弟元素 fiber
 * return： 父fiber
 * node： 真实dom节点
 * props：属性值
 * base: 上次的节点 fiber
 * effectTag: 标记要执行的操作类型（删除、插入、更新）
 */

function render(vnode, container) {
    // console.log(vnode, container);
    // const node = createNode(vnode)
    // container.appendChild(node)
    wipRoot = {
        node: container,
        props: {
            children: [vnode]
        },
        base: null
    }
    nextUintWork = wipRoot
    deletions = []
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
        node = document.createDocumentFragment()
        // node = new DocumentFragment()
    }
    // reconcileChildren(props.children, node)
    updateNode(node, {}, props)
    return node
}

function updateClassComponent(fiber) {
    const { type, props } = fiber
    const cmpt = new type(props)
    const vnode = cmpt.render()
    reconcileChildren(fiber, [vnode])
}

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    wipFiber.hooks = []
    wipFiber.hookIndex = 0

    const { type, props } = fiber
    const vnode = type(props)
    reconcileChildren(fiber, [vnode])
}

function updateNode(node, prevProps, props) {
    Reflect.ownKeys(prevProps)
        .filter(key => key !== 'children')
        .forEach(key => {
            if (key.slice(0, 2) === 'on') {
                const event = key.slice(2).toLocaleLowerCase()
                node.removeEventListener(event, prevProps[key])
                return
            }
            node[key] = ''
        })
    Reflect.ownKeys(props)
        .filter(key => key !== 'children')
        .forEach(key => {
            if (key === 'style') {
                const obj = props[key]
                node[key] = Reflect.ownKeys(obj).map(style => `${style}:${obj[style]}`).join(';')
                return
            }
            if (key.slice(0, 2) === 'on') {
                const event = key.slice(2).toLocaleLowerCase()
                node.addEventListener(event, props[key])
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


function reconcileChildren_pre(workInProcessFiber, children) {
    let preSibling = null
    let oldFiber = workInProcessFiber.base && workInProcessFiber.base.child
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            children.splice(i, 1, ...children[i])
        }
        const child = children[i]

        const sameType = oldFiber && child && oldFiber.type === child.type
        let newFiber = null
        if (sameType) {
            // 复用
            newFiber = {
                type: child.type,
                props: child.props,
                node: oldFiber.node,
                base: oldFiber,
                child: null,
                sibling: null,
                return: workInProcessFiber,
                effectTag: UPDATE
            }
        }

        if (!sameType && child) {
            // 新增
            newFiber = {
                type: child.type,
                props: child.props,
                node: null,
                base: null,
                child: null,
                sibling: null,
                return: workInProcessFiber,
                effectTag: PLACEMENT
            }
        }

        if (!sameType && oldFiber) {
            // 删除
            oldFiber.effectTag = DELETION
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (i === 0) {
            workInProcessFiber.child = newFiber
        } else {
            preSibling.sibling = newFiber
        }
        preSibling = newFiber
    }
}

function placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects) {
    newFiber.index = newIdx

    if (!shouldTrackSideEffects) {
        //  新增
        return lastPlacedIndex
    }

    // 界面更新阶段，这里的fiber 可能是新增以及更新
    const base = newFiber.base
    if (base !== null) {
        const oldIndex = base.index
        if (oldIndex < newIdx) {
            return lastPlacedIndex
        } else {
            return oldIndex
        }
    } else {
        newFiber.effectTag = PLACEMENT
        return lastPlacedIndex
    }
}

function reconcileChildren(returnFiber, newChildren) {
    let previousFiber = null
    let oldFiber = returnFiber.base && returnFiber.base.child
    let lastPlacedIndex = 0
    let newIdx = 0
    let nextOldFiber = null

    let shouldTrackSideEffects = true
    if (!oldFiber) {
        shouldTrackSideEffects = false
    }

    // 1. 更新
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
        const newChild = newChildren[newIdx]
        if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber
            oldFiber = null
        } else {
            nextOldFiber = oldFiber.sibling
        }

        if (!(oldFiber && oldFiber.key === newChild.key && oldFiber.type === newChild.type)) {
            if (oldFiber === null) {
                oldFiber = nextOldFiber
            }

            break
        }

        const newFiber = {
            key: newChild.key,
            type: newChild.type,
            props: newChild.props,
            node: oldFiber.node,
            base: oldFiber,
            child: null,
            sibling: null,
            return: returnFiber,
            effectTag: UPDATE
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)
        if (previousFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousFiber.sibling = newFiber
        }
        previousFiber = newFiber
        oldFiber = nextOldFiber
    }

    if (newIdx === newChildren.length) {
        while (oldFiber) {
            deletions.push({
                ...oldFiber,
                effectTag: DELETION
            })
            oldFiber = oldFiber.sibling
        }
    }

    // 2. 新增  老链表已经遍历完
    if (oldFiber === null) {
        for (; newIdx < newChildren.length; newIdx++) {
            const newChild = newChildren[newIdx]
            const newFiber = {
                kye: newChild.key,
                type: newChild.type,
                props: newChild.props,
                node: null,
                base: null,
                child: null,
                sibling: null,
                return: returnFiber,
                effectTag: PLACEMENT
            }

            lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)

            if (previousFiber === null) {
                returnFiber.child = newFiber
            } else {
                previousFiber.sibling = newFiber
            }
            previousFiber = newFiber
        }
        return
    }

    // 3. 新老链表都有参数值

    const existingChildren = mapRemainingChildren(returnFiber, oldFiber)
    for (; newIdx < newChildren.length; newIdx++) {
        const newChild = newChildren[newIdx]
        let newFiber = {
            key: newChild.key,
            type: newChild.type,
            props: newChild.props,
            child: null,
            sibling: null,
            return: returnFiber,
            // node: null,
            // base: null,
            // effectTag: PLACEMENT
        }
        const matchFiber = existingChildren.get(newChild.key || newIdx)
        if (matchFiber) {
            newFiber = {
                ...newFiber,
                node: matchFiber.node,
                base: matchFiber,
                effectTag: UPDATE
            }
            shouldTrackSideEffects && existingChildren.delete(newChild.key || newIdx)
        } else {
            newFiber = {
                ...newFiber,
                node: null,
                base: null,
                effectTag: PLACEMENT
            }
        }

        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)

        if (previousFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousFiber.sibling = newFiber
        }
        previousFiber = newFiber
    }
}

function mapRemainingChildren(
    returnFiber,
    currentFirstChild,
) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    // instead.
    const existingChildren = new Map();

    let existingChild = currentFirstChild;
    while (existingChild !== null) {
        if (existingChild.key !== null) {
            existingChildren.set(existingChild.key, existingChild);
        } else {
            existingChildren.set(existingChild.index, existingChild);
        }
        existingChild = existingChild.sibling;
    }
    return existingChildren;
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
    deletions.forEach(fiber => {
        commitWorker(fiber)
    })
    commitWorker(wipRoot.child)
    currentRoot = wipRoot
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
    } else if (fiber.effectTag === UPDATE && fiber.node) {
        // console.log(fiber)
        updateNode(fiber.node, fiber.base.props, fiber.props)
    } else if (fiber.effectTag === DELETION) {
        // console.log('fiber', fiber)
        commitDeletions(fiber, parentNode)
    }
    if (fiber.type && fiber.type !== 'template' || fiber.effectTag !== PLACEMENT) {
        commitWorker(fiber.child)
    }

    commitWorker(fiber.sibling)
}

function commitDeletions(fiber, parentNode) {
    if (fiber.node) {
        parentNode.removeChild(fiber.node)
    } else {
        commitDeletions(fiber.child, parentNode)
    }
}

requestIdleCallback(workLoop)

export default {
    render
}

export function useState(init) {
    const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex]
    // 初始化
    const hook = oldHook ? {
        state: oldHook.state,
        queue: oldHook.queue
    } : {
        state: init,
        queue: []
    }

    // 更新
    // 模拟批量更新
    hook.queue.forEach(action => (hook.state = action))

    function setState(action) {
        hook.queue.push(action)
        wipRoot = {
            node: currentRoot.node,
            props: currentRoot.props,
            base: currentRoot
        }
        nextUintWork = wipRoot
        console.log(action)
        deletions = []
    }

    wipFiber.hooks.push(hook)
    wipFiber.hookIndex++

    return [hook.state, setState]
}