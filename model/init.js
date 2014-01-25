
var db = require('/model/db');

var run = function(){

    db.authenticate(settings.BAE_AK, settings.BAE_SK, function(err, result) {
        if (err) {
            console.log('----------------Error');
            return;
        }


    db.dropDatabase();
    db.createCollection("users");
    db.createCollection("posts");
    db.createCollection("im");
    db.createCollection("comment");
    db.createCollection("diary");
    db.createCollection("tips");
    db.createCollection("notebooks");
    db.createCollection("todos");
    db.createCollection("apis");
    db.posts.insert({
        "name" : "iyueyao",
        "uuid" : "otwvr9gzp8h17slq1223",
        "time" : {
            "date" : ISODate("2013-12-23T02:22:47.329Z"),
            "year" : 2014,
            "month" : "2014-20",
            "day" : "2014-1-20",
            "minute" : "2014-1-20 10:22"
        },
        "title" : "写下你的第一篇文章",
        "post" : "写下你的第一篇文章，记录一切。",
        "desc" : "又一个NodeJs博客",
        "type" : "topic",
        "img" : "",
        "homeRecom" : false,
        "tags" : [],
        "comments" : [],
        "pv" : 0
    });
    db.users.insert({
        "name" : "iyueyao",
        "password" : "e10adc3949ba59abbe56e057f20f883e",
        "email" : "409355439@qq.com"
    });
    console.log('----------------init.run')
    });
}

module.exports = run ;
