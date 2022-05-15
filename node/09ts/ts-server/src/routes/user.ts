import * as Koa from 'koa';
import { nextTick } from 'process';
import { get, post, middlewares } from '../framework/route-decortes'
const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }];


@middlewares([
    async function guard(ctx, next) {
        // console.log(ctx.header);
        
        if (ctx.header.token) {
            await next()
        } else {
            throw '请登录'
        }
    }
])
export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users };
    }
    @post('/users', {
        middlewares: [
            async (ctx, next) => {
                const body = ctx.request.body
                if (!body.name) {
                    throw '请输入用户名'
                }
                await next()
            }
        ]}
    )
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }

}