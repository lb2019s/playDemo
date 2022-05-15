const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class Koa{
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        http.createServer(async (req, res) => {
            const ctx = this.createContext(req, res)
            // this.callback(ctx)
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            res.end(ctx.body)
        }).listen(...args)
    }

    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = req
        ctx.res = res

        return ctx
    }

    // use(callback) {
    //     this.callback = callback
    // }
    use(callback) {
        this.middlewares.push(callback)
    }

    compose(middlewares) {
        return function(ctx) {
            return dispatch(0);
            // 执行第0个
            function dispatch(i) {
                let fn = middlewares[i];
                if (!fn) {
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        // promise完成后，再执行下一个
                        return dispatch(i + 1);
                    })
                );
            }
        };
    }
}

module.exports = Koa