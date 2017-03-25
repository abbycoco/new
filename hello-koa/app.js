/**
 * Created by benben on 17/2/17.
 */

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

// addControllers(router);// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
// const Koa = require('koa');
// // 注意require('koa-router')返回的是函数:
// // ()表示函数调用
// const router = require('koa-router')();
// // 一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
// const bodyParser = require('koa-bodyparser');
// // 创建一个Koa对象表示web app本身:
// const app = new Koa();
// app.use(bodyParser());
// // koa-bodyparser必须在router之前被注册到app对象上。
// // 对于任何请求，app将调用该异步函数处理请求：
// // 参数ctx是由koa传入的封装了request和response的变量，
// // 我们可以通过它访问request和response，
// // next是koa传入的将要处理的下一个异步函数。
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//
//     // 可以用await调用另一个异步函数
//     await next();
//     // 设置response的Content-Type:
//     // ctx.response.type = 'text/html';
//     // 设置response的内容:
//     // ctx.response.body = '<h1>Hello, koa2!</h1>';
// });
// // add url-route:
// // 用router.get('/path', async fn)处理的是get请求。
// // 如果要处理post请求，可以用router.post('/path', async fn)。
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });
// router.post('/signin', async (ctx, next) => {
//     var
//         name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`signin with name: ${name}, password: ${password}`);
//     if (name === 'koa' && password === '12345') {
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href="/">Try again</a></p>`;
//     }
// });
// router.get('/', async (ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//         <form action="/signin" method="post">
//             <p>Name: <input name="name" value="koa"></p>
//             <p>Password: <input name="password" type="password"></p>
//             <p><input type="submit" value="Submit"></p>
//         </form>`;
// });
// // add router middleware:
// app.use(router.routes());
// // 在端口3000监听:
// app.listen(3000);
// console.log('app started at port 3000...');
