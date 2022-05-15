const { Service } = require('egg')

class UserService extends Service {
    async getAll() {
        return [
            {
                name: 'UserService'
            }
        ]
    }
}

module.exports = UserService