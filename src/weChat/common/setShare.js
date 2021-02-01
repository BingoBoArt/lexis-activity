import Api from "./api.js";
function setShare(options) {
  console.log("start");
  var Config = {
    wxTitle: "兰思英语•精英小班",
    wxDesc: "为孩子量身打造的ESL课程，2月开抢啦！",
    wximgurl: `${window.location.protocol}//${
      window.location.hostname
    }/lexis-activity/weChat/assets/images/logo.png`,
    shareUrl: window.location.href,
    ...options
  };
  $.ajax({
    url: Api.domain + "/signuser",
    data: {
      url: window.location.href
    },
    type: "POST",
    success: function(res) {
      let wx = window.wx;
      // let inviteUrl = window.L.util.getLocalStorage("inviteUrl");
      // alert(inviteUrl);
      // console.log(Config, res.data);
      wx.config(res.data);
      wx.ready(function() {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: Config.wxTitle,
          desc: Config.wxDesc,
          link: Config.shareUrl,
          imgUrl: Config.wximgurl,
          success: function() {
            // weixinFn.shareCallback(1);
          },
          cancel: function() {
            //alertlayer({w: "分享失败！"});
          }
        });
        // 分享给微信朋友
        wx.onMenuShareAppMessage({
          title: Config.wxTitle,
          desc: Config.wxDesc,
          link: Config.shareUrl,
          imgUrl: Config.wximgurl,
          success: function() {
            console.log("success");
            // weixinFn.shareCallback(2);
          },
          cancel: function() {
            //alertlayer({w: "分享失败！"});
          }
        });
        wx.error(function() {
          // alert(JSON.stringify(this.arguments));
        });
      });
    }
  });
}

export default setShare;
