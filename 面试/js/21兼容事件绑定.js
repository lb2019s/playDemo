class bindEvent {
    constructor(element) {
        this.elm = element
    }

    addEventListener(event, handler, useCapture = false) {
        if (this.elm.addEventListener) {
            this.elm.addEventListen(event, handler, useCapture)
        } else if (this.elm.attachEvent) {
            this.elm.attachEvent('on' + event, handler)
        } else {
            this.elm['on' + event] = handler
        }
    }

    removeEventListener(event, handler, useCapture = false) {
        if (this.elm.removeEventListener) {
            this.elm.removeEventListener(event, handler, useCapture)
        } else if (this.elm.detachEvent) {
            this.elm.detachEvent('on' + event, handler)
        } else {
            this.elm['on' + event] = null
        }
    }

    static stopPropagation(element) {
        if (element.stopPropagation) {
            element.stopPropagation()
        } else {
            element.cancelBubble = false
        }
    }

    static preventDefault(element) {
        if (element.preventDefault) {
            element.preventDefault()
        } else {
            element.returnValue = false
        }
    }
}