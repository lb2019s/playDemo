import Node from './node.js'
import Food from './food.js'

const OppositeDirection = {
    ArrowUp: 'ArrowDown',
    ArrowDown: 'ArrowUp',
    ArrowLeft: 'ArrowRight',
    ArrowRight: 'ArrowLeft'
}

class Snake {
    constructor({ box, nodeSide}) {
        this.head = null
        this.tail = null
        this.direction = 'ArrowRight'
        this.box = box
        this.nodeSide = nodeSide
        this.food = null

        this.maxLeft = this.box.clientWidth / (this.nodeSide || 20)
        this.maxTop = this.box.clientHeight / (this.nodeSide || 20)
    }
    init() {
        let head = new Node({left: 1, top: 0})
        let tail = new Node({left: 0, top: 0})
        head.next = tail
        this.head = head
        this.tail = tail
        this.food = new Food(this.box.offsetWidth, this.box.offsetHeight, this)
        this.box.append(this.food.render())
        this.render()
    }
    append() {
        let { left, top } = this.tail
        let node = new Node({left, top})
        this.box.append(node.init())
        this.tail.next = node
        this.tail = node
    }
    setDirection(direction) {
        if (OppositeDirection[this.direction] !== direction && (direction === 'ArrowUp' || direction === 'ArrowDown' || direction === 'ArrowLeft' || direction === 'ArrowRight') ) {
            this.direction = direction
        }
    }
    move() {
        let { direction, head } = this
        let nextTop = head.top
        let nextLeft = head.left
        switch(direction) {
            case 'ArrowUp' : head.top--; break; 
            case 'ArrowDown' : head.top++; break; 
            case 'ArrowLeft' : head.left--; break; 
            case 'ArrowRight' : head.left++; break;
        }
        this.CrossBorder(head)
        head.move()
        let nextNode = head.next
        while (nextNode) {
            let [top, left] = [nextNode.top, nextNode.left];
            [nextNode.top, nextNode.left] = [nextTop, nextLeft];
            [nextTop, nextLeft] = [top, left];

            nextNode.move()
            nextNode = nextNode.next
        }
        if (head.top === this.food.top && head.left === this.food.left) {
            this.box.append(this.food.render())
            this.append()
        }
    }

    CrossBorder(head) {
        if (head.top === this.maxTop) {
            head.top = 0
        } else if (head.top === -1) {
            head.top = this.maxTop - 1
        } else if (head.left === this.maxLeft) {
            head.left = 0
        } else if (head.left === -1) {
            head.left = this.maxLeft - 1
        }
    }
    
    render() {
        let head = this.head
        while(head) {
            this.box.append(head.init())
            head = head.next
        }
    }
}

export default Snake