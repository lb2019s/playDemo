import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as glob from 'glob'

const router = new KoaRouter

export const decorator = (router: KoaRouter) => (
    method: 'get' | 'post',
) => (path, options: { middlewares: Koa.Middlewares[] } = { middlewares: [] }) =>
        (target, property) => {
            process.nextTick(() => {
                let mws = []
                if (target.middlewares) {
                    mws.push(...target.middlewares)
                }
                router[method](path, ...mws, ...options.middlewares, target[property])
            })
        }

export const method = decorator(router)
export const get = method('get')
export const post = method('post')

export const load = (folder: string) => {

    const extname = '.{js,ts}'
    glob.sync(require('path').join(folder, `./**/*${extname}`))
        .forEach(item => require(item))

    return router
}

export const middlewares = (middlewares: Koa.middlewares[]) =>
    (target) => {
        target.prototype.middlewares = middlewares
    }