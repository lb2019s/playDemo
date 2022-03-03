const { STRING } = require('sequelize')
module.exports = {
    schema: {
        name: STRING
    },
    options: {
        timestamps: false
    }
}