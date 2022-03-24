import { findInList } from './utils.js'

class Food {
    constructor(boxWidth, boxHeight, snake, foodSide = 20) {
        this.food = null
        this.side = foodSide
        this.boxWidth = boxWidth
        this.boxHeight = boxHeight
        this.snake = snake
    }
    random() {
        this.left = ((Math.random() * (this.boxWidth / this.side - 1)) >> 0)
        this.top = ((Math.random() * (this.boxHeight / this.side - 1)) >> 0)
    }
    render() {
        this.random()
        let isRender = findInList(this.snake, {key: 'left', value: this.left}, {key: 'top', value: this.top})
        if (isRender) {
            return this.render()
        } else {
            this.remove()
            let food = document.createElement('div')
            food.style.position = 'absolute'
            food.style.left = this.left * this.side + 'px'
            food.style.top = this.top * this.side + 'px'
            food.style.width = this.side + 'px'
            food.style.height = this.side + 'px'
            food.style.background = `rgb(${Math.random() * 256 | 0}, ${Math.random() * 256 | 0}, ${Math.random() * 256 | 0})`
            this.food = food
            return food
        }
    }
    remove() {
        if (this.food) {
            let food = this.food
            this.food.parentElement.removeChild(food)
        }
    }
}

export default Food