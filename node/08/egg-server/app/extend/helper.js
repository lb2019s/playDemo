const moment = require('moment')

exports.success = (ctx, res = null, msg = "success") => {
    ctx.body = {
        code: 0,
        data: res,
        msg
    }
    ctx.status = 200
}

exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')