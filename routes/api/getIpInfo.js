/**
 * Created by DFH on 14-1-25.
 */
var http = require('http');

var getLocaIp = function(req,res){
    var ip = _getLocaIp(req,res)
    res.jsonp(ip);
}
var getIp = function(req,res){
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    if(ip == '127.0.0.1') ip='219.143.89.53';
    _getIpinfo(ip,function(err,data){
        data.ip = ip ;
        res.jsonp(data);
    });
}
var getIpInfo = function(req,res){
    var query = req.params.ip;
    _getIpinfo(query,function(error,data){
        res.jsonp(data);
    })
};
var getLocaIpInfo = function(req,res,cb){
    var ip = _getLocaIp(req,res);
    _getIpinfo(ip[0],cb)
}

var _getLocaIp = function(req,res){
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    return ip.split(',');
}
var _getIpinfo = function(ip,cb){
    var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='+ip;
    http.get(url,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            cb(null,JSON.parse(data));
        })
        respon.on('error',function(){
            cb(null, {status:'Error!'});
        })
    })
}

exports.getLocaIp = getLocaIp;
exports.getLocaIps = _getLocaIp;
exports.getLocaIpInfo = getLocaIpInfo;
exports.getIp = getIp;
exports.getIpInfo = getIpInfo;