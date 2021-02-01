/*
 功能：
  通用分享方法，支持app和微信分享
 使用方法：
  import Share from xxx
  Share.init({title: '', desc: '', imgUrl: xx})
  Share.do({title: '', desc: '', imgUrl: xx})
 */
import Request from "@base/common/request.js";
import Api from "@base/common/api.js";
import AppHandle from '@base/common/appHandle.js'
import LemonUtils from 'lemon-utils';
const default_config = {
  title: "英语天天见｜外教直播天天见",
  desc: "英语天天见｜外教直播天天见",
  imgUrl: 'http://file.lexislive.com.cn/resource/201809/fcb6f61d-d411-42e3-b993-ff8d0ea7a5df.png',
  link: window.location.href
}
export default {
  /**
   * 
   * @param {*} options title|desc|imgUrl|link|apiUrl
   */
  init(options = {}) {
    this.Config = {
      ...default_config,
      ...options
    };
    let that = this;
    /** 微信环境 **/
    if(LemonUtils.UA.weixin && window.wx){
      Request({
        url: Api.wechat_domain + '/wechat/signature',
        data: {
          url: window.location.href
        },
        type: "POST"
      }).then((res) => {
        let wx = window.wx;
        wx.config(res.data);
        console.log("share", that.Config)
        wx.ready(function() {
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            ...that.Config,
            success: function() {
            },
            cancel: function() {
            }
          });
          // 分享给微信朋友
          wx.onMenuShareAppMessage({
            ...that.Config,
            success: function() {
            },
            cancel: function() {
            }
          });
          wx.error(function(err) {
            console.log(err)
          });
        });
      })
    }
  },
  // 分享函数, 判断app 微信环境
  do(options) {
    if(this.Config){
      this.Config = {
        ...this.config,
        ...options
      }
    }else{
      this.Config = {
        ...default_config,
        ...options
      }
    }

    if(AppHandle.isApp){
      // app环境
      AppHandle.share(this.Config)
    }else if(LemonUtils.UA.weixin){
      // 微信环境，提示右上角打开
    }
  }
}
