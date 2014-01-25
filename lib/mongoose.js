var setting = require('../config');
var mongoose = require('mongoose');
var db = exports.Db = mongoose.createConnection();
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: '',
    pass: ''
}

var isDev = false;
var host = isDev ? 'localhost' : 'mongo.duapp.com';
var port = isDev ? '27017' : '8908';
var database = isDev ? 'foo' : setting.BAE_DBNAME;
var user = isDev ? 'foo' : setting.BAE_AK;
var pass = isDev ? 'bar' : setting.BAE_SK;
db.open(host, database, port, options);
db.on('error', function (err) {
    //logger.error("connect error :" + err);
    //监听BAE mongodb异常后关闭闲置连接
    db.close();
});
//监听db close event并重新连接
db.on('close', function () {
    db.open(host, database, port, options);
});