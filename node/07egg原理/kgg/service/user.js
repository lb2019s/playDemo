const dealy = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})

module.exports = app => ({
    getName: async () => {
        // return dealy('张三', 2000)
        return await app.$model.user.findAll()
    },
    getAge: () => {
        return 20
    }
})