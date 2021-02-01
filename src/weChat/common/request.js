/**
 * Created by aweakcoder on 16/10/09.
 */
import Api from "./api"
let Apidomain = Api.domain
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
    // let wechat_token = window.L.cookie.get("wc-tkn") || "";
    let wechat_token = window.L.util.getLocalStorage('wc-tkn') || "";
    var _data = option.data || {};
    //_data.activityInfo = getSourceValue(_data);
    _data['_r'] = +new Date();
    var _url = (url.indexOf("http") > -1) ? url : (Apidomain + url)
    console.log(url);
    let _headers = {
      'wc-tkn': wechat_token,
      'lan': 'ZH'
    };
    if(option.headers){
      _headers = {
        ..._headers,
        ...option.headers
      }
    }
    window.$.ajax({
      type: option.type || "GET",
      url: _url,
      data: _data,
      dataType: option.dataType || 'json',
      headers: _headers,
      timeout: option.timeout || 20000,
      success: function (data) {
        if (option.trigger) {
          $(option.trigger).removeClass("btn-loading-state dis-btn");
        }
        defer.resolve(data);
      },
      error: function (data, error) {
        if (option.trigger) {
          $(option.trigger).removeClass("btn-loading-state dis-btn");
        }
        defer.reject(data);
      }
    });
  }
  return defer;
};
export default Request
