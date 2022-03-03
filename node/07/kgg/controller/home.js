// module.exports = app => ({
//     index: async ctx => {
//         // ctx.body = 'ctrl home'
//         // ctx.body = await app.$service.user.getName()
//         app.ctx.body = await app.$service.user.getName()
//     },
//     detail: async ctx => {
//         // ctx.body = '$ctrl detail'
//         // ctx.body = await app.$service.user.getAge()
//         app.ctx.body = await app.$service.user.getAge()
//     }
// })

module.exports = {
    index: async app => {
        // app.ctx.body = await app.$service.user.getName()
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: async app => {
        app.ctx.body = await app.$service.user.getAge()
    }
}