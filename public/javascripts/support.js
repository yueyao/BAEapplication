/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-3
 * Time: 下午8:28
 * To change this template use File | Settings | File Templates.
 */


(function(window) {

    window.Y = window.$ = window.Y || {};

    Y.prototype = {
        //dom
        getId: null,
        getByClass: null,
        addClass: null,
        removeClass: null,
        attr: null,
        getStyle: null,
        setStyle: null,
        getPos: null,
        getIndex: null,
        insertAfter: null,
        prepend: null,
        nextAll: null,
        prevAll: null,
        siblings: null,
        dupElement: null,
        float2Pos: null,
        isChild: null,

        //事件
        addEvent: null,
        removeEvent: null,
        addWheel: null,
        mouseleave: null,
        mouseenter: null,

        //通用
        forEach: null,
        map: null,
        forEachIn: null,
        clone: null,
        trim: null,
        addZero: null,
        rand: null,

        //扩展
        extend: null,
        addPrototype: null,
        //浏览器 客户端 相关
        client: null,
        scrollData: null,
        browser: null,

        setCookie: null,
        readCookie: null,
        removeCookie: null,
        setSessionStor: null,
        readSessionStor: null,
        ajax: null,
        jsonp: null,
        json2url: null,
        url2json: null,

        vesion: "v0.1 :)",
        HELLO_WORLD: null
    };

    (function() {
        //特性检测。一次性检测 并设定，避免后续重复进行特性检测。
        var ua = navigator.userAgent,
            oAjax = null;

        //获取样式
        if (typeof window.getComputedStyle === 'function') {
            Y.getStyle = function(obj, name) {
                return getComputedStyle(obj, false)[name];
            };
        } else {
            Y.getStyle = function(obj, name) {
                return obj.currentStyle[name];
            };
        }

        //添加事件 移除事件
        if (typeof window.addEventListener === 'function') {

            Y.addEvent = function(obj, sEv, fn) {

                obj.addEventListener(sEv, fn, false);

            };
            Y.removeEvent = function(obj, sEv, fn) {

                obj.removeEventListener(sEv, fn, false);

            };

        } else {
            Y.addEvent = function(obj, sEv, fn) {

                obj.attachEvent('on' + sEv, fn);

            };
            Y.removeEvent = function(obj, sEv, fn) {

                obj.detachEvent('on' + sEv, fn);

            };
        }

        //判断浏览器
        if (ua.match(/msie ([\d.]+)/i)) {

            Y.browser = function() {

                return 'IE' + ua.match(/msie ([\d.]+)/i)[1];

            }
        } else if (ua.match(/firefox\/([\d.]+)/i)) {

            Y.browser = function() {

                return 'Firefox';

            }
        } else if (ua.match(/chrome\/([\d.]+)/i)) {

            Y.browser = function() {

                return 'chrome';

            }
        } else if (ua.match(/version\/([\d.]+).*safari/i)) {

            Y.browser = function() {

                return 'safari';

            }

        }

        //
        if (typeof window.sessionStorage === 'object') {

            Y.setSessionStor = function(name, value) {

                sessionStorage[name] = value;
            }
            Y.readSessionStor = function(name) {

                return sessionStorage[name];
            }

        }

        if (typeof window.XMLHttpRequest === 'function') {

            oAjax = new XMLHttpRequest();

        } else {

            oAjax = new ActiveXObject("Microsoft.XMLHTTP");

        }

        //获取id
        Y.getId = function(id) {

            return document.getElementById(id);
        }

        Y.getByClass = function(oParent, sClass) {

            var arr = [];
            var oAll = oParent.getElementsByTagName('*');
            var re = new RegExp("\\b" + sClass + "\\b");
            for (var i = 0; i < oAll.length; i++) {
                if (re.test(oAll[i].className)) {
                    arr.push(oAll[i]);
                }
            }
            return arr;
        }

        // 增加类
        Y.addClass = function(obj, sClass) {

            var re = new RegExp('\\b' + sClass + '\\b');

            if (!re.test(obj.className)) {
                obj.className += ' ' + sClass;
            }

        }

        //移除类
        Y.removeClass = function(obj, sClass) {

            var re = new RegExp('\\b' + sClass + '\\b', 'g');

            obj.className = obj.className.replace(re, '').replace(/\s+/g, ' ');

        }

        //设置样式
        Y.setStyle = function(obj, json) {

            for (var i in json) {
                obj.style[i] = json[i];
            }
        }

        //自定义属性
        Y.attr = function(obj, name, value) {

            if (arguments.length == 2) {

                return obj[name] || obj.getAttribute(name);

            } else if (arguments.length == 3) {

                if (obj.getAttribute(name)) {

                    obj.setAttribute(name, value);

                } else {

                    obj.style[name] = value;

                }
            }
        }

        //绝对位置
        Y.getPos = function(obj) {

            var l = 0,
                t = 0;

            while (obj) {

                l += obj.offsetLeft;
                t += obj.offsetTop;

                obj = obj.offsetParent;
            }

            return {
                x: l,
                y: t
            };
        }

        Y.float2Pos = function(arr) {

            var aPos = [],

                max = arr.length,

                i,

                j;

            for (i = 0; i < max; i++) {

                aPos[i] = {
                    left: arr[i].offsetLeft,
                    top: arr[i].offsetTop
                };

            }

            for (j = 0; j < max; j++) {

                arr[j].style.left = aPos[j].left + 'px';

                arr[j].style.top = aPos[j].top + 'px';

                arr[j].style.position = 'absolute';

                arr[j].style.margin = '0';

            }

            return aPos;
        }

        //dom下标
        Y.getIndex = function(obj) {

            var nIndex = 0,
                prev = obj.previousSibling;

            while (prev) {

                if (prev.nodeType == 1) {

                    nIndex++;

                }
                prev = prev.previousSibling;
            }
            return nIndex;
        }

        //在某元素之后插入
        Y.insertAfter = function(oldEle, newEle) {

            if (oldEle && newEle) {

                if (oldEle.nodeType === 1 && newEle.nodeType === 1) {

                    if (oldEle.nextSibling) {

                        oldEle.parentNode.insertBefore(newEle, oldEle.nextSibling);

                    } else {

                        throw new Error('无法插入');

                    }

                }
            }

        }

        //头部追加子节点
        Y.prepend = function(newEle, oParent) {

            var child = oParent.firstChild;

            child ? oParent.insertBefore(oParent, child) : oParent.appendChild(oParent);

        }

        //返回该元素 前面的同胞元素
        Y.prevAll = function(ele) {

            var pre = ele.previousSibling;
            var aResult = [];
            while (pre) {

                if (pre.nodeType === 1) {

                    aResult.unshift(pre);
                }
                pre = pre.previousSibling;
            }
            return aResult;
        }

        //返回该元素 后面的同胞元素
        Y.nextAll = function(ele) {
            var next = ele.nextSibling;
            var aResult = [];

            while (next) {

                if (next.nodeType == 1) {

                    aResult.push(next);

                }

                next = next.nextSibling;
            }
            return aResult;
        }

        //返回该元素所有的同胞元素
        Y.siblings = function(ele) {

            return Y.prevAll(ele).concat(Y.nextAll(ele));

        }

        Y.isChild = function(oParent, obj) {
            while (obj) {
                if (oParent == obj) return true;

                obj = obj.parentNode;
            }
            return false;
        }

        //克隆元素
        Y.dupElement = function(ele) {

            var oDiv = document.createElement('div'),
                str;

            ele.parentNode.insertBefore(oDiv, ele);

            oDiv.appendChild(ele);

            str = oDiv.innerHTML;

            oDiv.parentNode.insertBefore(ele, oDiv);

            oDiv.parentNode.removeChild(oDiv);

            oDiv.innerHTML = str;


            return oDiv.children[0];

        }

        //替换模板标记 {{text}}
        Y.replaceMark = function(str, json) {

            return str.replace(/\{\{\$\w+\}\}/g, function(s) {
                var name = s.match(/\w+/)[0];

                return json[name];
            });

        }

        //客户端高度、宽度
        Y.client = function() {

            var viewH = document.documentElement.clientHeight,
                viewW = document.documentElement.clientWidth;

            return {
                width: viewW,
                height: viewH
            };
        }

        //滚动距离
        Y.scrollData = function() {

            var top = document.body.scrollTop || document.documentElement.scrollTop,
                left = document.body.scrollLeft || document.documentElement.scrollLeft;

            return {
                top: top,
                left: left
            };
        }



        //去首尾空格
        Y.trim = function(str) {

            return str.replace(/^\s+|\s$/g, "");

        }

        //补零
        Y.addZero = function(str) {

            str = Number(str);
            return str > 10 ? str : "0" + str;

        }

        //设置cookie
        Y.setCookie = function(name, value, days) {

            if (days !== false) {

                var date = new Date();

                date.setDate(date.getDate() + days);

                document.cookie = name + '=' + value + ';expires=' + date;
            } else {

                document.cookie = name + '=' + value;
            }

        }

        //读取cookie
        Y.readCookie = function(name) {

            var arr = document.cookie.split('; ');

            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');

                if (arr2[0] == name) {
                    return arr2[1];
                }
            }

            return "";
        }

        //移除cookie
        Y.removeCookie = function(name) {
            Y.setCookie(name, "", -1);
        }

        //mouseenter
        Y.mouseenter = function(obj, fn) {

            Y.addEvent(obj, "mouseover", function(oEvent) {

                var oFrom = oEvent.fromElement || oEvent.relatedTarget;

                if (Y.isChild(this, oFrom)) return;

                fn.call(this, oEvent);

            })
        }
        //mouseleave
        Y.mouseleave = function(obj, fn) {

            Y.addEvent(obj, 'mouseout', function(oEvent) {

                var oTo = oEvent.toElement || oEvent.relatedTarget;

                if (Y.isChild(this, oTo)) return;

                fn.call(this, oEvent);

            });
        }
        //鼠标滚轮
        Y.addWheel = function(obj, fn) {

            //滚轮事件兼容性写法
            obj.onmousewheel = fnWheel;

            if (obj.addEventListener) {
                obj.addEventListener("DOMMouseScroll", fnWheel, false);
            }

            function fnWheel(ev) {
                var oEvent = ev || event;
                var down = true;
                //判断滚轮上下兼容性写法
                // var down=oEvent.wheelDelta?  oEvent.wheelDelta<0   :oEvent.detail>0;
                if (oEvent.wheelDelta) {

                    down = oEvent.wheelDelta < 0; //chrome  ie

                } else {

                    down = oEvent.detail > 0; // ff

                }
                fn(down);
                //阻止默认事件 兼容性写法
                if (oEvent.preventDefault) {

                    oEvent.preventDefault(); //ff

                }
                return false; //chrome
            }
        }

        //url转为json
        Y.url2json = function(str) {

            var arrTmp = null,
                reg = /([^=?&]+)=([^=?&]+)/g,
                obj = {};

            while (arrTmp = reg.exec(str)) {

                obj[arrTmp[1]] = arrTmp[2];

            }
            return obj;
        }

        //json转化为url
        Y.json2url = function(json) {

            var arr = [],
                i;

            for (i in json) {

                arr.push(i + "=" + json[i]);

            }

            return arr.join('&');
        }

        //ajax
        Y.ajax = function(url, fnSucc, fnFaild) {

            oAjax.open('GET', url, true);

            oAjax.send();

            oAjax.onreadystatechange = function() {

                if (oAjax.readyState == 4) {

                    if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                        fnSucc(oAjax.responseText);
                    } else {
                        if (fnFaild) {
                            fnFaild();
                        }
                    }
                }

            }

        }

        //jsonp
        Y.jsonp = function(url, data, fn) {

            var oHead = document.getElementsByTagName('head')[0],
                oS = document.createElement('script'),
                arr = [],
                timer = null,
                str, fnName, i;

            fnName = 'jsonp' + (Math.random() + '').replace('.', '');

            window[fnName] = function(json) {

                oHead.removeChild(oS);

                clearTimeout(timer);

                fn(json);
            };

            timer = setTimeout(function() {
                console.log("访问超时！！");
            }, 3000);

            data.t = new Date().getTime();
            data.cb = fnName;

            for (i in data) {

                arr.push(i + "=" + data[i]);
            }

            str = url + "?" + arr.join("&");

            oS.src = str;

            oHead.appendChild(oS);
        }

        Y.rand = function(n, m, i) {

            var arr = [];
            while (arr.length < i) {
                var num = _rand(n, m);
                if (_arrIndexOf(arr, num) != -1) continue;
                arr.push(num);
            }
            arr.sort(function(n1, n2) {
                return n1 - n2;
            });
            return arr;

            function _arrIndexOf(arr, n) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == n) return i;
                }
                return -1;
            }

            function _rand(n, m) {
                return n + parseInt(Math.random() * (m - n));
            }
        }

        //循环数组
        Y.forEach = function(arr, fn) {

            for (var i = 0; i < arr.length; i++) {

                fn(arr[i]);

            }
        }

        //映射数组
        Y.map = function(fn, arr) {

            var aResult = [];

            Y.forEach(arr, function(ele) {

                aResult.push(fn(ele));

            });

            return aResult;

        }

        // 遍历对象属性 交给fn
        Y.forEachIn = function(action, object) {

            for (var property in object) {

                if (Object.prototype.hasOwnProperty.call(object, property)) {

                    action(property, object[property]);

                }
            }
        }

        //Y库扩展
        Y.extend = function(property) {

            var retult = Y.clone(this);

            Y.forEachIn(property, function(name, value) {
                retult[name] = value;
            });
            return retult;
        }

        //系统原型扩展   *尽量不去扩展
        Y.addPrototype = function(obj, oProp, fn) {

            var nbody = "function" + oProp + "(){[nativecode]}";
            if (obj.hasOwnProperty(oProp) && obj[oProp].toString().replace(/\s/g, '') === nbody) {
                return true;
            }
            obj[oProp] = fn;
        }

        //对象克隆
        Y.clone = function(object) {

            function CreateFn() {

            }

            CreateFn.prototype = object;

            return new CreateFn();

        }


        Y.HELLO_WORLD = "" + "  _          _ _                            _     _   _  \n" + " | |        | | |                          | |   | | | | \n" + " | |__   ___| | | ___   __      _____  _ __| | __| | | | \n" + " | '_ \\ / _ \\ | |/ _ \\  \\ \\ /\\ / / _ \\| '__| |/ _` | | | \n" + " | | | |  __/ | | (_) |  \\ V  V / (_) | |  | | (_| | |_| \n" + " |_| |_|\\___|_|_|\\___/    \\_/\\_/ \\___/|_|  |_|\\__,_| (_) \n \n" + " 何波 409355439@qq.com";

    })();


    Y.addPrototype(
        Date.prototype, "ChineseDay", function() {
            var dayArr = ["日", "一", "二", "三", "四", "五", "六"];
            var oDate = new Date();
            return "周" + dayArr[oDate.getDay()];
        });
}(window));