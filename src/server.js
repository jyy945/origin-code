const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    if(ctx.request.path === '/ajax'){
        ctx.response.body = 'message from server'
    }
})
app.listen("8888")