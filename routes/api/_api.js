/**
 * Created by DFH on 14-1-10.
 */
var http = require('http');


var index = function(req,res){
    var query = req.query.act;
    switch(query){
        case"showTime":
            showTime(req,res);
            break;
        case 'showNextTime':
            showNextTime(req,res);
            break;
        default :
            res.jsonp({data:'nothing'});
            break;
    }
}

var showTime = function(req,res){
    var getUrl = 'http://www.sodao.com/ShowTime/gt';
    http.get(getUrl,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            res.jsonp({data:data});
        })
        respon.on('error',function(){
            res.jsonp({data:'Error'});
        })
    })
}

var showNextTime = function(req,res){
    var getUrl = 'http://www.sodao.com/ShowTime/gt1';
    http.get(getUrl,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            res.jsonp({data:data});
        })
        respon.on('error',function(){
            res.jsonp({data:'Error'});
        })
    })
};



exports.index = index;