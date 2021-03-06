const Vue = require('vue')

const app = new Vue({
    template: `<div>hello world</div>`
})

const renderer = require('vue-server-renderer').createRenderer()

renderer.renderToString(app).then(html => {
    console.log(html)
}).catch(err => {
    console.error(err)
})