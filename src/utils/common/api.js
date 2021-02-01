import Config from '@base/common/config.js';
let this_host = location.protocol + '//' + location.hostname;
let domain = Config.global_env == "pro" ? "http://liveapi.lexislive.com.cn/" : this_host
const api = {
  domain: domain
};
export default api
