/**
 * Created by DFH on 14-1-25.
 */
var http = require('http');

var getLocaIp = function(cb){
    var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json';
    http.get(url,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            cb(JSON.parse(data))
        })
        respon.on('error',function(){
            cb({status:'Error!'})
        })
    })

}

var getIp = function(req,res){
    getLocaIp(function(data){
        res.jsonp(data);
    })

}
var getIpInfo = function(req,res){
    var query = req.params;
    var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='+query;

    http.get(url,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            res.jsonp(JSON.parse(data));
        })
        respon.on('error',function(){
            res.jsonp({status:'Error!'});
        })
    })
}

exports.getLocaIp = getLocaIp;
exports.getIp = getIp;
exports.getIpInfo = getIpInfo;