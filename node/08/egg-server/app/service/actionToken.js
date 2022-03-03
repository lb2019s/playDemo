const  { Service } = require('egg')

class ActionTokenService extends Service {
    async apply(_id) {
        const { ctx } = this
        ctx.app.jwt.sign({
            data: {
                _id
            },
            exp: Math.floor(Date.now() / 1000 + 60 * 60 * 4)
        })
    }
}

module.exports = ActionTokenService