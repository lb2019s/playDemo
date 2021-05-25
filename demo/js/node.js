class Node {
    constructor({left, top, side = 20, backGround = 'rgb(255, 0, 0)'}) {
        this.left = left
        this.top = top
        this.side = side
        this.backGround = backGround
        this.next = null
        this.node = null
    }
    init() {
        let node = document.createElement('div')
        node.style.position = 'absolute'
        node.style.left = this.left * this.side + 'px'
        node.style.top = this.top * this.side + 'px'
        node.style.width = this.side + 'px'
        node.style.height = this.side + 'px'
        node.style.background = this.backGround
        this.node = node
        return node
    }
    move() {
        let node = this.node
        node.style.left = this.left * this.side + 'px'
        node.style.top = this.top * this.side + 'px'
    }
    remove() {
        this.node.parentElement.removeChild(this.node)
    }
}

export default Node