/**
 * Created by jockey on 15/9/17.
 */
define(function () {
    var util = window.L.util;

    function getSourceValue(data) {
        var activityInfo = JSON.parse(data.activityInfo || '{}');
        var source = util.getSessionStorage("h5active-schf-src");
        if (source) {
            activityInfo.source = source;
        }
        return JSON.stringify(activityInfo);
    }

    return function (option, onSuccess, onError) {
        option = option || {};
        option.urlPath = option.urlPath || [];
        onSuccess = onSuccess || function () {};
        onError = onError || function () {};
        var url = option.url + (option.urlPath.length > 0 ? ("/" + option.urlPath.join('/')) : "");
        if (option.localData) {
            console.log("localData url: ", url);
            console.log("localData param: ", option.data);
            console.log("localData res: ", option.localData);
            setTimeout(function(){
                onSuccess(option.localData);
            }, 1000);
        } else {
            var _data = option.data || {};
            _data.activityInfo = getSourceValue(_data);
            window.$.ajax({
                type: option.type || "GET",
                url: url+"?_r="+(+new Date()),
                data: _data,
                dataType: option.dataType || 'json',
                timeout: option.timeout || 20000,
                success: function (data) {
                    onSuccess(data);
                },
                error: function (data) {
                    onError(data);
                }
            });
        }
    };
});
