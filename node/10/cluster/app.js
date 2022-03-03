const http = require('http')

const app = http.createServer((req, res) => {
    Math.random() < 0.8 ? '' : b()
    res.end('hello')
})

// if (!require.main) {
    app.listen(3000, () => {
        console.log('server runing at 3000');
    })
// } else {
//     module.exports = app
// }