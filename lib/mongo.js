var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var setting = require('../config');
 
var db_name = 'yourmongodbname';                  // 数据库名，从云平台获取
var db_host =  'mongo.duapp.com';      // 数据库地址
var db_port =  '8908';   // 数据库端口
var username = 'yourak';                 // 用户名
var password = 'yoursk';                 // 密码

var db = new Db(setting.BAE_DBNAME, new Server(setting.BAE_DBHOST, setting.BAE_DBPROT, {}), {w: 1});

function testMongo(req, res) {
  function test(err, collection) {
    collection.insert({a: 1}, function(err, docs) {
      if (err) {
        console.log(err);
        res.end('insert error');
        return;
      }
      collection.count(function(err, count) {
        if (err) {
          console.log(err);
          res.end('count error');
          return;
        } 
        res.end('count: ' + count + '\n');
        db.close(); 
      });
    });  
  }
 
  db.open(function(err, db) {
    db.authenticate(setting.BAE_AK, setting.BAE_SK, function(err, result) {
      if (err) {
        db.close();
        res.end('Authenticate failed!');
        return;   
      }
      db.collection('test_insert', test); 
    });  
  });
}

module.exports = testMongo;