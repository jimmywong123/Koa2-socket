const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const Sequelize = require('sequelize');

const app = new Koa();
const router = new Router();

exports.server = require('http').createServer(app.callback());

app.use(views(path.join(__dirname, './view'), {
  extension: 'html'
}))

// 静态文件访问
app.use(koaStatic(
    path.join(__dirname,'/'),
    {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        gzip: true,
    } // eslint-disable-line
));

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'hello world'
	});
});

app
  .use(router.routes())
  .use(router.allowedMethods());

exports.server.listen(3000);
exports.sequelize = new Sequelize('socket', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },  
    timestamps:false
    // 仅 SQLite 适用
    //storage: 'path/to/database.sqlite'
});

require('./controller/socketContrl');

console.log(`Server is running at port: 3000`);



