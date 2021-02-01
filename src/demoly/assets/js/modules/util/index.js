/**
 * 工具函数
 */
module.exports = {
    /**
     * 格式化日期
     * @method format
     * @static
     * @param {Date} d 日期对象
     * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
     * @return {string}  返回format后的字符串
     * @example
     var d=new Date();
        alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
        */
    formatDate: function(d, pattern) {
        pattern = pattern || 'yyyy-MM-dd';
        var y = d.getFullYear().toString();
        var o = {
                M: d.getMonth() + 1, //month
                d: d.getDate(), //day
                h: d.getHours(), //hour
                m: d.getMinutes(), //minute
                s: d.getSeconds() //second
            };
        pattern = pattern.replace(/(y+)/ig, function(a, b) {
            return y.substr(4 - Math.min(4, b.length));
        });
        for (var i in o) {
            pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
                return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
            });
        }
        return pattern;
    },
    /**
     * 金额格式化（千分位，保留两位小数）
     * @param  {[type]} moneyByFen  [金额（单位分）]
     * @param  {[type]} needDecimal [是否需要小数部分]
     * @return {[type]}             [description]
     */
    formate_money: function(moneyByFen, needDecimal){
        //- 分——>元
        var moneyByYuan = moneyByFen / 100;
        var array = ('' + moneyByYuan).split('.');
        //- 整数
        var intString = array[0] + '';
        intString = intString.replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");

        var decimalsString = "";

        if(array[1]){
            if(array[1].length >= 2){
                decimalsString = array[1].slice(0, 2);
            }else{
                decimalsString = array[1] + "0";
            }
        }else{
            decimalsString = "00";
        }

        //- ——>千分位
        if(needDecimal){
            return intString + "." + decimalsString;
        }else{
            return intString;
        }
    },
    /**
     * 金额格式化（无千分位，保留两位小数）
     * @param  {[type]} moneyByFen  [金额（单位分）]
     * @param  {[type]} needDecimal [是否需要小数部分]
     * @return {[type]}             [description]
     */
    formate_money_dec: function(moneyByFen, needDecimal){
        //- 分——>元
        var moneyByYuan = moneyByFen / 100;
        var array = ('' + moneyByYuan).split('.');
        //- 整数
        var intString = array[0] + '';

        var decimalsString = "";

        if(array[1]){
            if(array[1].length >= 2){
                decimalsString = array[1].slice(0, 2);
            }else{
                decimalsString = array[1] + "0";
            }
        }else{
            decimalsString = "00";
        }

        //- ——>千分位
        if(needDecimal){
            return Number(intString + "." + decimalsString);
        }else{
            return Number(intString);
        }
    },

    /**
     * 获取两个时间间隔秒数
     * @param  {[type]} timelow  格式yyyy-mm-dd
     * @param  {[type]} timehigh [description]
     * @return {[type]}          [description]
     */
    getDisSec: function(timelow, timehigh){
        return ((new Date(timehigh.replace(/-/mg, "/"))) - (new Date(timelow.replace(/-/mg, "/")))) / 1000;
    },

    /**
     * 判断元素是否在数组中
     * @param  {[type]} item      [description]
     * @param  {[type]} array     [description]
     * @param  {[type]} needIndex [是否需要返回索引]
     * @return {[type]}           [description]
     */
    inArray: function(item, array, needIndex){
        if(array.constructor !== Array) return;
        var _index = -1;
        for (var i = array.length - 1; i >= 0; i--) {
            var _item = array[i];
            if(_item == item){
                _index = i;
                break;
            }
        }
        if(needIndex){
            return _index;
        }else{
            if(_index > -1){
                return true;
            }else{
                return false;
            }
        }
    },
    /**
     * 浮点数计算，修正精度问题
     * 原理，将两位数都乘以小数位数最大的，相加后再除
     * @type {Object}
     */
    FloatCalculate: {
        accAdd: function(arg1, arg2){
            var r1, r2, t1, t2, m;
            try{ r1 = arg1.toString().split(".")[1].length }catch(e){ r1 = 0 }
            try{ r2 = arg2.toString().split(".")[1].length }catch(e){ r2 = 0 }
            t1 = Number(arg1.toString().replace(".", ""));
            t2 = Number(arg2.toString().replace(".", ""));
            if(r1 > r2){
                t2 = t2 * Math.pow(10, r1 - r2)
            }else if(r1 < r2){
                t1 = t1 * Math.pow(10, r2 - r1)
            }
            m = Math.pow(10, Math.max(r1, r2))
            return (t1 + t2) / m;
        },
        accSub: function(arg1, arg2){
            var r1, r2, t1, t2, m, n;
            try{ r1 = arg1.toString().split(".")[1].length }catch(e){ r1 = 0 }
            try{ r2 = arg2.toString().split(".")[1].length }catch(e){ r2 = 0 }
            t1 = Number(arg1.toString().replace(".", ""))
            t2 = Number(arg2.toString().replace(".", ""))
            if(r1 > r2){
                t2 = t2 * Math.pow(10, r1 - r2)
            }else if(r1 < r2){
                t1 = t1 * Math.pow(10, r2 - r1)
            }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((t1 - t2) / m).toFixed(n);
        },
        accMul: function(arg1, arg2){
            var m = 0;
            var s1 = arg1.toString();
            var s2 = arg2.toString();
            try{ m += s1.split(".")[1].length; }catch(e){}
            try{ m += s2.split(".")[1].length; }catch(e){}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },
        accDiv: function(arg1, arg2){
            var t1 = 0;
            var t2 = 0;
            var r1;
            var r2;
            try{ t1 = arg1.toString().split(".")[1].length; } catch(e){}
            try{ t2 = arg2.toString().split(".")[1].length; } catch(e) {}
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * Math.pow(10, t2 - t1);
        }
    },
    /**
     * 获取小数位数
     */
    getDecimalCount: function(decimal){
        if(isNaN(decimal))return 0;
        var _decimal_arr = (decimal + "").split(".");
        var _decimal_count = _decimal_arr.length == 2 ? _decimal_arr[1].length : 0;
        return _decimal_count;
    },
    /**
     * 判断对象或者数组是否为空
     */
    isEmpty: function(obj) {
        if (obj == null) return true;
        for (var name in obj){
            return false;
        }
        return true;
    },
    trimQs: function(url) {
        return url ? url.split('?')[0] : ''
    }
}
