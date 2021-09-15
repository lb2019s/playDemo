class Compiler {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if (this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        const childNodes = el.childNodes;
        childNodes.forEach(node => {
            if (this.isElement(node)) {
                // console.log('元素', node.nodeName)
                this.compileElement(node)
            } else if (this.isInterpolation(node)){
                // console.log('插值', node.textContent)
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        this.update(node, RegExp.$1, 'text')
    }

    compileElement(node) {
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value;
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2);
                this[dir] && this[dir](node, exp)
            }
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1);
                this.handleEvent(node, exp, dir)
            }
        })
    }
    isDirective(name) {
        return name.indexOf('k-') === 0
    }
    isEvent(name) {
        return name.indexOf('@') === 0
    }
    handleEvent(node, exp, dir) {
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
        node.addEventListener(dir, fn.bind(this.$vm))
    }
    update(node, exp, dir) {
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp]);
        
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }
    text(node, exp) {
        this.update(node, exp, 'text')
    }
    textUpdater(node, value) {
        node.textContent = value
    }
    html(node, exp) {
        this.update(node, exp, 'html')
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    model(node, exp) {
        this.update(node, exp, 'model')
        node.addEventListener('input', e => {
            this.$vm[exp] = e.target.value
        })
    }
    modelUpdater(node, value) {
        node.value = value
    }
}