import Config from './config.js';
let this_host = location.protocol + '//' + location.hostname;
let domain = Config.global_env == "pro" ? "http://liveapi.lexislive.com.cn/" : this_host
let wechat_domain = (Config.global_env == "pro") ? "http://wechatapi.lexislive.com.cn/liveapi" : "http://wechatapi.lexislive.com.cn/liveapi"
const api = {
  wechat_domain: wechat_domain, // 微信相关接口的域名
  domain: wechat_domain
};
export default api
