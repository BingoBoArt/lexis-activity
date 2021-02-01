/**
 * Created by aweakcoder on 16/10/09.
 */

//import Storage from 'storagelib-le'
//var config = require("jspath/common/config");
//var isProduction = config.global_env=="pro"?true:false;
var isProduction = false;
/*
function getSourceValue(data) {
  var activityInfo = JSON.parse(data.activityInfo || '{}');
  var source = Storage.getSessionStorage("h5active-schf-src");
  if (source) {
    activityInfo.source = source;
  }
  return JSON.stringify(activityInfo);
}
*/
function Request(option) {
  var defer = $.Deferred();
  if (option.trigger) {
    if ($(option.trigger).hasClass("btn-loading-state") || $(option.trigger_btn).hasClass("dis-btn")) {
      //调用时候使用.then .fail .always
      return defer;
    } else {
      $(option.trigger).addClass("btn-loading-state dis-btn");
    }
  }

  option = option || {};
  option.urlPath = option.urlPath || [];
  //判断如果url是对象的话，取url.url为接口
  var url = (typeof (option.url) == 'object' ? option.url.url : option.url) + (option.urlPath.length > 0 ? ("/" + option.urlPath.join('/')) : "");
  if (option.mock) {
    console.log("mock url: ", url);
    console.log("mock param: ", option.data);
    console.log("mock res: ", option.mock);
    setTimeout(function () {
      if (option.trigger) {
        $(option.trigger).removeClass("btn-loading-state dis-btn iconfont");
      }
      defer.resolve(option.mock);
    }, 1000);
  } else {
    var _data = option.data || {};
    //_data.activityInfo = getSourceValue(_data);
    _data['_r'] = +new Date();
    window.$.ajax({
      type: option.type || "GET",
      url: url,
      data: _data,
      dataType: option.dataType || 'json',
      timeout: option.timeout || 20000,
      success: function (data) {
        if (option.trigger) {
          $(option.trigger).removeClass("btn-loading-state dis-btn");
        }
        defer.resolve(data);
      },
      error: function (data, error) {
        if (!isProduction) {
          if (data.status == 500) {
            console.log('接口错误码：500，接口url：' + url + '，开发者：' + (option.url.name ? option.url.name : '未关联'));
          } else if (data.status == 404) {
            console.log('接口错误码：404，接口url：' + url + '，开发者：' + (option.url.name ? option.url.name : '未关联'));
          } else if (error == "timeout") {
            console.log('接口错误码：请求超时，接口url：' + url + '，开发者：' + (option.url.name ? option.url.name : '未关联'));
          }
        }
        if (option.trigger) {
          $(option.trigger).removeClass("btn-loading-state dis-btn");
        }
        defer.reject();
      }
    });
  }
  return defer;
};
export default Request
