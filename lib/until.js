/**
 * Created by DFH on 14-1-25.
 */

var  enunicode = function(code){
    code=code.replace(/[\u00FF-\uFFFF]/g,function($0){
        return '\\u'+$0.charCodeAt().toString(16);
    });
    return code;
}
exports.enunicode = enunicode;