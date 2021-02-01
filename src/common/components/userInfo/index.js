
import Request from "@base/common/request.js";
import Api from "@base/common/api.js";
import AppHandle from '@base/common/appHandle.js'
import Config from '@base/common/config.js'
import Events from "@base/common/events.js";
import LemonUtils from 'lemon-utils';

export default{
  /**
   * 获取用户信息
   * options
   *  forceAppLogin 是否强制app登录 默认false
   *  forceWechatLogin 是否强制微信跳授权 默认true
   *  checkAuth 是否需要跳授权
   *  checkBind 是否需要跳登录
   */
  getUserInfo(that, options) {
    console.log('======')
    console.log(LemonUtils)
    let _options = {
      forceAppLogin: false,
      forceWechatLogin: true,
      ...(options || {})
    };
    return new Promise((resolve, reject) => {
      if(AppHandle.isApp){
        // app 环境
        let timer = null;
        Events.on("get_userInfo", data => {
            clearTimeout(timer);
            timer = null;
            if(data && data.token){
              // 已登录
              LemonUtils.setLocalStorage("we-token", data.token)
              resolve(data)
            }else{
              // 未登录
              LemonUtils.removeLocalStorage("we-token")
              if(_options.forceAppLogin){
                // 强制登录 todo
              }else{
                resolve({});
              }
            }
        });
        timer = setTimeout(() => {
          // android手机若未登录，不会回调，在此填坑
          LemonUtils.removeLocalStorage("we-token")
          resolve({});
        }, 2000)
        AppHandle.init()
      }else{
        // 微信环境
        if(_options.forceWechatLogin){
          this.handleAuth(that, _options).then((res) => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        }else{
          resolve({});
        }
      }
    })
  },
  /**
   * 处理微信授权
   */
  handleAuth(that, options) {
    let _options = {
      checkAuth: true,
      checkBind: true,
      ...(options || {})
    };
    let code = LemonUtils.getUrlParam("code");
    return new Promise((resolve, reject) => {
      Request({
        url: Api.wechat_domain + "/wechat/isauthcbind",
        // mock: require("@/mock/auth"),
        data: {
          redirectUri: encodeURIComponent(window.location.href),
          code: code,
          token: LemonUtils.getLocalStorage("we-token") || ""
        },
        headers: {
          // "token": wechat_token
        },
        type: "POST"
      }).then(res => {
          let data = res.data;
          LemonUtils.setLocalStorage("preUrl", that.$route.path);
          LemonUtils.setLocalStorage(
            "we-openid",
            (data.dinfo && data.dinfo.openId || '')
          );
          LemonUtils.setLocalStorage(
            "we-token",
            (data.dinfo && data.dinfo.token || '')
          );
          if (data.dcode == 2) {
            // 授权
            if (_options.checkAuth) {
              setTimeout(function() {
                // 为了统计请求顺利发出
                location.replace(data.dinfo);
              }, 100);
            }else{
              resolve(data.dinfo || data);
            }
          } else if (data.dcode == 3) {
            // 已绑定
            resolve(data.dinfo || data);
          } else if (data.dcode == 4) {
            //需要完善信息 跳注册 
            if (_options.checkBind) {
              that.$router.replace({
                path: "Login"
              });
            }else{
              resolve(data.dinfo || data)
            }
          } else if (data.dcode == 0) {
            resolve(data.dinfo || data);
          } else if (data.dcode == 1) {
            //token过期   跳授权 如果不清除token 会循环跳授权
            LemonUtils.removeLocalStorage("we-token");
            if (_options.checkAuth) {
              location.replace(data.dinfo);
            }else{
              resolve(data.dinfo || data)
            }
          } else {
            resolve(data.dinfo || data);
          }
      }).catch((err) => {
        reject(err);
      })
    })
  },
}