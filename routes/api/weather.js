/**
 * Created by DFH on 14-1-25.
 */
var http = require('http');

var cityCodes = require('../../lib/cityCode');
var getIp  = require('./getIpInfo');

/**
 * 获取省级列表
 * @param req
 * @param res
 */
var weatherProvList = function(req,res){
    var result = cityCodes.provs();
    res.json(result)
}
/**
 * 获取城市列表
 * @param req
 * @param res
 */
var weatherCityList = function(req,res){
    var result = cityCodes.citys();
    res.jsonp(result);
}
/**
 * 根据城市名 获取天气
 * @param req
 * @param res
 */
var getWeatherByCity = function(req,res){
    var query = req.params.city;
    var code = cityCodes.queryCode(query);
    _getWeather(code,function(data){
        res.jsonp(data);
    })
}
/**
 * 根据城市编码 获取天气
 * @param req
 * @param res
 */
var getWeatherByCode = function(req,res){
    var query = req.code;
    _getWeather(query,function(data){
        res.jsonp(data);
    })
}
/**
 * 根据城市名 获取编码
 * @param req
 * @param res
 */
var getCodeFormCity = function(req,res){
    var query = req.params.city;
    var code = cityCodes.queryCode(query);
    var result ={};
    result = code>0?{status:'true',code:code,city:query}:{status:'false',city:query};
    res.jsonp(result);
}
/**
 * 根据编码 获取城市名
 * @param req
 * @param res
 */
var getCityFormCode = function(req,res){
    var query = req.params.code;
    var city = cityCodes.queryCity(query);
    var result ={};
    result = city!=''?{status:'true',code:query,city:city}:{status:'false',city:query};
    res.jsonp(result);
};

/**
 * 获取天气状况
 * @param req
 * @param res
 */
var getWeather = function(req,res){
    var query = req.params.code || '';
    if(!query){
        getIp.getLocaIp(function(data){
            if(!data.status){
                var code = cityCodes.queryCode(data.city);
                _getWeather(code,function(data){
                    res.jsonp(data);
                })
            }else {
                res.jsonp({status:'false'})
            }
        })
    } else {
        _getWeather(query,function(data){
            res.jsonp(data);
        })
    }

}


/**
 * 天气API DEMO
 * @param req
 * @param res
 */
var getWeatherDemo = function(req,res){
    res.render('api/weatherDemo',{ title: 'weatherDemo' })
}

var _getWeather = function(code,cb){
    if(!code) return {status:'false',msg:'No City Code'};
    var url = 'http://m.weather.com.cn/data/'+code+'.html';

    http.get(url,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            cb(JSON.parse(data))
        })
        respon.on('error',function(){
            cb({status:'false',msg:'Error!'})
        })
    })

}

var test = function(req,res){
    var url = 'http://m.weather.com.cn/data/101010100.html';

    http.get(url,function(respon){
        var data = '';
        respon.on('data',function(chunk){
            data+= chunk;
        })
        respon.on('end',function(){
            res.jsonp(JSON.parse(data))
        })
        respon.on('error',function(){
            res.jsonp({status:'false',msg:'Error!'})
        })
    })
}

exports.weatherCityList = weatherCityList ;
exports.weatherProvList = weatherProvList ;
exports.getWeatherByCity = getWeatherByCity ;
exports.getWeatherByCode = getWeatherByCode ;
exports.getCity = getCodeFormCity ;
exports.getCode = getCityFormCode ;
exports.getWeather = getWeather ;
exports.getWeatherDemo = getWeatherDemo ;
exports.wtest = test;
