class BindEvent {
    constructor(el) {
        this.el = el
    }
    addEventListener(event, handler, useCapture = false) {
        if (this.el.addEventListener) {
            this.el.addEventListener(event, handler, useCapture)
        } else if (this.el.attachEvent) {
            this.el.attachEvent('on' + event, handler)
        } else {
            this.el['on' + event] = handler
        }
    }
    removeEventListener(event, handler, useCapture = false) {
        if (this.el.removeEventListener) {
            this.el.removeEventListener(event, handler, useCapture)
        } else if (this.el.detachEvent) {
            this.el.detachEvent('on' + event, handler)
        } else {
            this.el['on' + event] = null
        }
    }

    static stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = false
        }
    }

    static preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }
}