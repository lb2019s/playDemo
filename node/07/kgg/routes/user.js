module.exports = {
    // 'get /': async ctx => {
    //     ctx.body = '用户首页'
    // },
    // 'get /info': async ctx => {
    //     ctx.body = '用户信息'
    // }
    'get /': async app => {
        // app.ctx.body = 'name: ' + await app.$service.user.getName()
        app.ctx.body = await app.$service.user.getName()
    },
    'get /info': async app => {
        app.ctx.body = 'age: ' + await app.$service.user.getAge()
    }
}

// module.exports = app => ({
//     'get /': async ctx => {
//         ctx.body = '用户name: ' + await app.$service.user.getName()
//     },
//     'get /info': async ctx => {
//         ctx.body = '用户age: ' + await app.$service.user.getAge()
//     }
// })