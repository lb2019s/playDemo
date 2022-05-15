const { Service } = require('egg')

class UserAccessService extends Service {
    async login(payload) {
        const { ctx, service } = this
        const user = await service.user.findByMobile(payload.mobile)
        if (!user) {
            ctx.throw(404, 'user not find')
        }
        let verifyPwd = ctx.compare(payload.password, user.password)
        if (!verifyPwd) {
            ctx.throw(401, 'user password is error')
        }

        return { token: await service.actionToken.apply(user._id) }
    }

    async logout() {

    }

    async current() {
        const { ctx, service } = this
        const _id = ctx.state.user.data._id
        const user = await service.user.find(_id)
        if (!user) {
            ctx.throw(404, 'user not find')
        }
        user.password = 'How old are you'
        return user
    }
}

module.exports = UserAccessService