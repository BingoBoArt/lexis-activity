/**
 * Created by aweakcoder on 16/10/09.
 */
import ComConfig from '@base/common/config.js'
import Api from '@/common/api.js'
import ComUtil from '@/common/util.js'
import Axios from 'axios'
import qs from 'qs'

//配置接口信息
Axios.defaults.baseURL = Api.domain
Axios.defaults.credentials = 'include'
Axios.defaults.headers['Accept'] = 'application/json'
let handleRes = res => {
  return res
}

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    let token = localStorage && localStorage.getItem(ComConfig.token_key) || ''
    if (token) {
      config.data.token = token
    }
    if (config.headers['Content-Type'] == 'application/json') {
      config.data = JSON.stringify(config.data)
    } else if (config.method === 'post' && (config.headers['Content-Type'] === undefined || config.headers['Content-Type'] === '')) {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    //  _.toast("错误的传参", 'fail');
    // return Promise.reject(error);
  }
)

Axios.interceptors.response.use(response => {
  // console.log("interceptors", response);
  return handleRes(response.data)
})

let request = function (config) {
  let _req = null
  if (config.mock) {
    console.log('mock params', config.data)
    console.log('mock result', config.mock)
    _req = new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log('handleRes(config.mock): ', handleRes(config.mock));
        resolve(handleRes(config.mock))
      }, 2000)
    })
  } else if (config.type && config.type == 'post') {
    _req = Axios.post(config.url || '', config.data, config.headers && {
      headers: config.headers
    } || {})
  } else {
    _req = Axios.get(config.url || '', {
      params: config.data
    })
  }
  return _req
}
export default request