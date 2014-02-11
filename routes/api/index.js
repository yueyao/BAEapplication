/**
 * Created by DFH on 14-1-22.
 */

var showtime = require('./showtime');
var getipinfo = require('./getIpInfo');
var weather = require('./weather');

module.exports = function(app){
    /**
     * 美女时钟API
     * showtime 当前时间
     * showNextTime 下一分钟
     *
     */
    app.get('/api/showtime',showtime.showTime);
    app.get('/api/showNextTime',showtime.showNextTime);

    /**
     * ip查询
     */
    app.get('/api/getIpInfo',getipinfo.getIp);
    app.get('/api/getIpInfo/:ip',getipinfo.getIpInfo);
    app.get('/api/getIp',getipinfo.getLocaIp);

    /**
     * 天气查询
     * wtest 测试
     * today 北京今天
     */
    app.get('/api/weather/wtest',weather.wtest)
    app.get('/api/weather/today',weather.getWeather)
    app.get('/api/weather/bycode/:code',weather.getWeather)
    app.get('/api/weather/demo',weather.getWeatherDemo)
    app.get('/api/weather/citys',weather.weatherCityList)
    app.get('/api/weather/provs',weather.weatherProvList)
    app.get('/api/weather/getprovs/:prov',weather.getCitysByProv)
    app.get('/api/weather/code/:city',weather.getCity)
    app.get('/api/weather/city/:code',weather.getCode)

}
