function setShare(){
    var Config = {
        "success": "恭喜你分享成功！",
        "wxTitle": '测试分享title',
        "wxDesc": "测试分享描述",
        "wximgurl": "https://jr.letv.com/a1/M00/1E/5F/CjwsYllcihOAPrA6AAAKBCwgeao857.png"
    };
    $.ajax({
        url: "http://rain.s1.natapp.cc/signuser",
        data: {
            url: window.location.href
        },
        type: 'POST',
        success: function(res){
            let wx = window.wx;
            wx.config(res.data);
            wx.ready(function () {
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    title: Config.wxTitle,
                    desc: Config.wxDesc,
                    link: location.href,
                    imgUrl: Config.wximgurl,
                    success: function () {
                        // weixinFn.shareCallback(1);
                    },
                    cancel: function () {
                        //alertlayer({w: "分享失败！"});
                    }
                });
                // 分享给微信朋友
                wx.onMenuShareAppMessage({
                    title: Config.wxTitle,
                    desc: Config.wxDesc,
                    link: location.href,
                    imgUrl: Config.wximgurl,
                    success: function () {
                        // weixinFn.shareCallback(2);
                    },
                    cancel: function () {
                        //alertlayer({w: "分享失败！"});
                    }
                });
                wx.error(function(){
                // alert(JSON.stringify(this.arguments));
                })
            })
        }
    })
}
export default setShare;