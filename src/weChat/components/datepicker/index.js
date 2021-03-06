// require("./lib/index.js")
require("./css/index.less")

function setDatePicker(options) {
    var IosSelect = window.IosSelect;
    var selectDateDom = options.selectDateDom;
    var showDateDom = options.showDateDom;
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    // var nowMonth = now.getMonth() + 1;
    // var nowDate = now.getDate();

    var current_show_date = showDateDom.attr('value').trim();
    if(current_show_date && current_show_date.split("-").length == 3){
        var current_show_date_arr = current_show_date.split("-")
        showDateDom.attr('data-year', current_show_date_arr[0]);
        showDateDom.attr('data-month', current_show_date_arr[1]);
        showDateDom.attr('data-date', current_show_date_arr[2]);
    }else{
        showDateDom.attr('data-year', '2010');
        showDateDom.attr('data-month', '1');
        showDateDom.attr('data-date', '1');
    }
    // 数据初始化
    function formatYear(nowYear) {
        var arr = [];
        for (var i = nowYear - 25; i <= nowYear; i++) {
            arr.push({
                id: i + '',
                value: i + ''
            });
        }
        return arr;
    }
    function formatMonth() {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            var show_i = i > 9 ? i : (0 + "" + i)
            arr.push({
                id: show_i,
                value: show_i
            });
        }
        return arr;
    }
    function formatDate(count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            var show_i = i > 9 ? i : (0 + "" + i)
            arr.push({
                id: show_i,
                value: show_i
            });
        }
        return arr;
    }
    var yearData = function (callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        callback(formatYear(nowYear))
        // }, 2000)
    }
    var monthData = function (year, callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        callback(formatMonth());
        // }, 2000);
    };
    var dateData = function (year, month, callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        var _month = parseInt(month);
        if (/^(1|3|5|7|8|10|12)$/.test(_month)) {
            callback(formatDate(31));
        }else if (/^(4|6|9|11)$/.test(_month)) {
            callback(formatDate(30));
        }else if (/^2$/.test(_month)) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                callback(formatDate(29));
            }else {
                callback(formatDate(28));
            }
        }else {
            throw new Error('month is illegal');
        }
        // }, 2000);
        // ajax请求可以这样写
        /*
        $.ajax({
            type: 'get',
            url: '/example',
            success: function(data) {
                callback(data);
            }
        });
        */
    };
    selectDateDom.bind('click', function () {
        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var _iosSelect = new IosSelect(3,
            [yearData, monthData, dateData],
            {
                title: '日期选择',
                itemHeight: 0.8,
                headerHeight: 0.9,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                showLoading: true,
                cssUnit: 'rem',
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    showDateDom.attr('data-year', selectOneObj.id);
                    showDateDom.attr('data-month', selectTwoObj.id);
                    showDateDom.attr('data-date', selectThreeObj.id);

                    // showDateDom.html(selectOneObj.value + '-' + selectTwoObj.value + '-' + selectThreeObj.value);
                    var choose_date = selectOneObj.value + '-' + selectTwoObj.value + '-' + selectThreeObj.value;
                    options.callback && options.callback(choose_date);
                }
            });
        console.log(_iosSelect)
    });
}

export default setDatePicker
