
    //加载第三方依赖
const express = require('express');
const swig = require('swig');
const gitOperations = require('./controllers/gitOperations');
const app = express();

//配置swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


//配置静态公用服务
app.use(express.static("public"));

//配置路由
app.get('/', function (req, res) {
    res.render('index',{title:"Git分支远程管理系统"});
});
app.get('/controller/createBranch/:name', gitOperations.createBranch);
app.get('/controller/getBranchInfo', gitOperations.getBranchInfo);

//容错机制，处理未定义路由，和服务器内部错误
app.get('*', function (req, res) {
    res.status(404);
    res.send("404,未指定路由");
});
app.use(function (err, req, res) {
    res.status(500);
    res.send("服务器内部错误");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});