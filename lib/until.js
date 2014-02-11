/**
 * Created by DFH on 14-1-25.
 */
var http =  require('http') ;
var  enunicode = function(code){
    code=code.replace(/[\u00FF-\uFFFF]/g,function($0){
        return '\\u'+$0.charCodeAt().toString(16);
    });
    return code;
}
var brows = function($agent){//移动终端浏览器版本信息
    return {
            ios: !!$agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: $agent.indexOf('Android') > -1 || $agent.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: $agent.indexOf('iPhone') > -1 || $agent.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: $agent.indexOf('iPad') > -1, //是否iPad
            IE: $agent.indexOf('MSIE')>-1 ,
            IEVersion: $agent.indexOf('MSIE')>-1 && $agent.match(/msie ([\d.]+)/i)[1],
            FF: $agent.indexOf('Firefox')>-1,
            FFVersion: $agent.indexOf('Firefox')>-1 && $agent.match(/firefox\/([\d.]+)/i)[1],
            Chrome: $agent.indexOf('Chrome')>-1,
            ChromeVersion:$agent.indexOf('Chrome')>-1 && $agent.match(/chrome\/([\d.]+)/i)[1],
            Safari: $agent.indexOf('safari')>-1,
            SafariVersion: $agent.indexOf('safari')>-1 && $agent.match(/version\/([\d.]+).*safari/i),
            useragent: $agent
    }

}
exports.brows = brows;
exports.enunicode = enunicode;