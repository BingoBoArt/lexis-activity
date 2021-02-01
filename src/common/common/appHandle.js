// 否则直接使用window.lxJsBridge会报错
// interface Window {
//   lxJsBridge: any;
//   getPageCommand: Function;
//   LexisCallPage: Function;
// }
import Events from "./events";
const isApp = window.lxJsBridge && window.lxJsBridge.send;

/**
 * 调用LexisCallPage, 获取token和id, getKeys支持参数扩展
 * test: window.LexisCallPage({code: 0, message: "", params:{userInfo: {test: 1}}})
 */
window.LexisCallPage = function(callbackJson) {
  console.log("LexisCallPage", JSON.stringify(callbackJson));
  if(callbackJson.module == 'pay'){
    // 原生支付
    Events.emit("get_payApp", callbackJson)
    return;
  }
  let callback_data = callbackJson && callbackJson.params || {}; // {code: 0, message: xx, module: 'pay', params:{}}
  for (var key in callback_data) {
    if (callback_data.hasOwnProperty(key)) {
      if (callback_data[key]) {
        let result_data = callback_data[key];
        Events.emit("get_" + key, result_data)
      }
    }
  }
};

export default {
  isApp: window.lxJsBridge && window.lxJsBridge.send,

  sendNative(params) {
    console.log("sendNative", params);
    if (this.isApp) {
      window.lxJsBridge.send(params);
    } else {
      // window.parent.postMessage(params, "*"); // post页面操作到外部父页面
    }
  },
  toHome(){
    let param = {
      "url": "home",
      "params": ""
    };
    this.sendNative(
      `{"event":"LexisRoute", "params":${JSON.stringify(param)}}`
    );
  },
  /**
   * @param {*} options 
   *  title: "",
   *  desc: "",
   *  imgUrl: '',
   *  link: ''
   */
  share(options){
    let param = {
      "module": "share",
      "params": {
        "href": options.link,
        "title": options.title,
        "desc": options.desc,
        "icon": options.imgUrl
      }
    };
    this.sendNative(
      `{"event":"LexisModule", "params":${JSON.stringify(param)}}`
    );
  },
  sendTitle(options){
    let param = {
      "module": "title",
      "params": {
        "title": options.title
      }
    };
    this.sendNative(
      `{"event":"LexisModule", "params":${JSON.stringify(param)}}`
    );
  },
  Landscape(landscape){
    // 0 是竖屏  1是横屏
    let param = {
      "module": "maskLandscape",
      "params": {
        "maskLandscape": landscape
      }
    }
    this.sendNative(
      `{"event":"LexisModule", "params":${JSON.stringify(param)}}`
    );
  },
  appPay(params){
    let param = {
      "module": "pay",
      "params": params
    }
    this.sendNative(
      `{"event":"LexisModule", "params":${JSON.stringify(param)}, "callback": "LexisCallPage"}`
    );
  },
  /**
   * 获取客户端信息
   * userInfo 当前用户信息
   */
  init(){
    var param = {
      getKeys: ["userInfo"]
    };
    this.sendNative(
        `{"event":"LexisCallApp", "params":${JSON.stringify(param)}, "callback": "LexisCallPage"}`
    );
    // window.LexisCallPage({code: 0, message: '', params:{userInfo:{token:123}}})
  }
}