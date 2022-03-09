import './style/index.css'
import './style/index.less'
import img from '../images/爪哇.png'
import axios from 'axios'
import counter from './counter'
import number from './number'

console.log('img', img);
console.log('hello, 老汉!');

// const Img = new Image()
// Img.src = img
// document.getElementById('app').appendChild(Img)

// axios.get('/api/info')
//     .then(response => {
//         console.log(response)
//     })

const btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.append(btn)
btn.onclick = function () {
    const div = document.createElement('div')
    div.innerHTML = 'item'
    document.body.appendChild(div)
}

counter()
number()

if (module.hot) {
    module.hot.accept('./number', function () {
        document.body.removeChild(document.getElementById('number'))
        number()
    })
}