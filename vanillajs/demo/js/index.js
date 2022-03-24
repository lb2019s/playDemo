import Snake from './snake.js'

const box = document.getElementById('box')
const snake = new Snake({box})
snake.init()
let timer = null

window.addEventListener('keyup', (e) => {
    snake.setDirection(e.key)
    if (e.key === ' ') {
        if (timer) {
            clearInterval(timer)
            timer = null
        } else {
            timer = setInterval(() => {
                snake.move()
            }, 300)
        }
    }
})