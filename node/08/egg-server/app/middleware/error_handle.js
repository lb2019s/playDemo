module.exports = (optins, app) => {
    return async (ctx, next) => {
        try {
            console.log('url', ctx.url, ctx.method);
            await next()
        } catch(error) {
            const status = error.status || 500
            const errorMessage = status === 500 && app.config.env === 'prod' ? 'Internal Server Erro' : error.message
            ctx.body = {
                status,
                errorMessage
            }
            if (status === 422) {
                ctx.body.detail = error.errors
            }
            ctx.status = 200
        }
    }
}