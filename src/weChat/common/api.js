import Config from '@/common/config.js';
let domain = Config.global_env == "dev" ? "http://app-test.lexislive.com.cn" : "http://app.lexislive.com.cn"
const api = {
    domain: domain
};
export default api
