const Koa = require('./koa')

const app = new Koa()

// app.use((req, res) => {
//     res.end('wahaha')
// })
// app.use(ctx => {
//     ctx.body = 'wahahawa'
// })

app.use(async (ctx, next) => {
    ctx.body = "1";
    await next();
    ctx.body += "5";
});
app.use(async (ctx, next) => {
    ctx.body += "2";
    await delay();
    await next();
    ctx.body += "4";
});
app.use(async (ctx, next) => {
    ctx.body += "3";
});

function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}
    

app.listen(3000, () => {
    console.log('server run http://localhost:3000');
})