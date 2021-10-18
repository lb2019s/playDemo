module.exports = {
    devServer: {
        before(app) {
            app.get('/api/list', (req, res) => {
                res.json([
                    {
                        id: 1,
                        name: "类型推断",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "类型别名",
                        selected: true,
                    },
                ])
            })
        }
    }
}