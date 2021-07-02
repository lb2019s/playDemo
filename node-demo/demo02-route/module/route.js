const app = {
    login: (req, res) => {
        res.end('login')
    },
    news: (req, res) => {
        res.end('news')
    },
    error: (req, res) => {
        res.end('error')
    }
}

module.exports = app