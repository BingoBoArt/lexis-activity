/**
 * Created by aweakcoder on 16/10/09.
 */
import Api from './api.js'
import Axios from 'axios'
import Qs from 'qs'
import LemonUtils from 'lemon-utils';
//配置接口信息
let _base = Api.domain
//配置接口信息
Axios.defaults.baseURL = _base;
// Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
const repeat_error = (error_msg) => {
  if(window.BJ_REPORT){
    window.BJ_REPORT.report(error_msg)
  }
}
console.log("LemonUtils")
console.log(LemonUtils)
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use((config) => {
  let lxua = { "device": "iPhone", "clientVersion": "H5", "channel": "lexislive" };
  if (LemonUtils.UA.ios) {
    lxua.device = 'iPhone';
  } else if (LemonUtils.UA.android) {
    lxua.device = 'android';
  }
  let wechat_token = LemonUtils.getLocalStorage('we-token') || "";
  let channel = LemonUtils.getLocalStorage('channel') || "lexislive";
  lxua.channel = channel;
  config.headers.common['token'] = wechat_token;
  config.headers.common['lan'] = 'ZH';
  config.headers.common['lxua'] = JSON.stringify(lxua);
  // config.headers.common['User-Agent-Record'] = {"clientType":"PC-WEB","clientVersion":"1.0.0","osVersion":"","phoneModel":"","manufacturer":"","phoneISP":"","timeZone":""};
  //在发送请求之前做某件事
  return config;
}, (error) => {
  //  _.toast("错误的传参", 'fail');
  // return Promise.reject(error);
  return error;
});

Axios.interceptors.response.use(
  response => {
    if(response.data.code && response.data.code != 0){
      // repeat_error({
      //   msg: "status:" + response.data.code + ", statusText:" + response.data.msg,   // 错误信息
      //   target: response.request.responseURL                                         // 错误的来源js
      // });
    }
    if (response.data.code == 1721) {
      // 未登录
      // ComUtil.goToLogin();
      // location.replace(`/web/?${parseInt(Math.random() * 1000)}#/Teacher/Login`)
    } else {
      return response.data;
    }
  },
  error => {
    console.log(error)
    console.log(error.response)
    if(error && error.response){
        repeat_error({
          msg: "status:" + error.response.status + ", statusText:" + error.response.statusText,   // 错误信息
          target: error.response.request.responseURL                                         // 错误的来源js
        });
    }else{
      repeat_error({
        msg: "status: 未知状态",   // 错误信息
        target: ""  // 错误的来源js
      });
    }
    return error;
  }
);

let request = function (config) {
  let _req = null;
  if (config.mock) {
    console.log('mock params', config.data)
    console.log('mock result', config.mock)
    _req = new Promise((resolve, reject) => {
      setTimeout(function () {
        // console.log('handleRes(config.mock): ', handleRes(config.mock));
        resolve(config.mock)
      }, 2000)
    })
  } else if (config.type && config.type == 'get') {
    _req = Axios.get(config.url || '', {
      params: config.data
    })
  } else {
    // 不加QS.stringify 默认走application/json。
    // QS.stringify转换出来是 "email=xxx&password=xxx" 就是application/x-www-form-urlencoded
    if(config.headers && config.headers['Content-Type'] == 'application/json'){
      _req = Axios.post(config.url || '', JSON.stringify(config.data), {
        headers: {
          ...config.headers
        }
      })
    }else{
      _req = Axios.post(config.url || '', Qs.stringify(config.data))
    }
    
  }
  return _req
}
export default request
