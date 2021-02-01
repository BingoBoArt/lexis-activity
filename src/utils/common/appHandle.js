// 否则直接使用window.lxJsBridge会报错
// interface Window {
//   lxJsBridge: any;
//   getPageCommand: Function;
//   LexisCallPage: Function;
// }
import api from "./api";
import Events from "./events";
function AppHandle(){
  var isApp = window.lxJsBridge && window.lxJsBridge.send;
  function sendNative(params){
    if (isApp) {
      window.lxJsBridge.send(params);
    } else {
      window.parent.postMessage(params, "*"); //post页面操作到外部父页面
      console.log("sendNative", params);
    }
  }

  /**
   * 调用LexisCallPage, 获取token和id, getKeys支持参数扩展
   * test: window.LexisCallPage({code: 0, message: "", params:{userInfo: {test: 1}}})
   */
  window.LexisCallPage = function(callbackJson) {
    console.log("LexisCallPage", JSON.stringify(callbackJson));
    let callback_data = callbackJson && callbackJson.params || {}; // {code: 0, message: xx, params:{}}
    for (var key in callback_data) {
      if (callback_data.hasOwnProperty(key)) {
        if (callback_data[key]) {
          let result_data = callback_data[key];
          Events.emit("get_" + key, result_data)
        }
      }
    }
  };
  /**
   * 获取客户端信息
   * userInfo 当前用户信息
   */
  function init(){
    var param = {
      getKeys: ["userInfo"]
    };
    this.sendNative(
        `{"event":"LexisCallApp", "params":${JSON.stringify(param)}, "callback": "LexisCallPage"}`
    );
    // window.LexisCallPage({code: 0, message: '', params:{userInfo:{token:123}}})
  }
  function toHome(){
    let param = {
      "url": "home",
      "params": ""
    };
    this.sendNative(
      `{"event":"LexisRoute", "params":${JSON.stringify(param)}}`
    );
  }
  // "href": `${api.domain}/lexis-activity/utils/index.html#/LevelProfile`,
  function share(_shareUrl){
    let param = {
      "module": "share",
      "params": {
        "href": _shareUrl,
        "title": "我正在英语天天见学英语！北美外教天天直播！快来跟我一起学吧！",
        "desc": "我正在英语天天见学英语！北美外教天天直播！快来跟我一起学吧！",
        "icon": `http://file.lexislive.com.cn/resource/201810/a5b858f8-3601-4542-b13c-9700b78c7cbd.jpg`
      }
    };
    this.sendNative(
      `{"event":"LexisModule", "params":${JSON.stringify(param)}}`
    );
  }
  return{
    sendNative: sendNative,
    init: init,
    toHome: toHome,
    share: share
  }
}
export default AppHandle;
