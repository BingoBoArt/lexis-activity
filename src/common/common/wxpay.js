/**
 * 微信支付
 * options: {param: }
 */
export default {
  do(options) {
    if(!window.wx){
      console.log("error !window.wx");
      return;
    }
    window.wx.config({
      appId: "wx640d7ba452880c2a",
      jsApiList: ["chooseWXPay"],
      debug: false
    });
    window.wx.chooseWXPay({
      ...options.param,
      timestamp: options.param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      success: function(res) {
        options.success && options.success(res)
      },
      fail: function (res) {
        console.log('下单失败:', res)
        options.fail && options.fail(res)
      },
      cancel: function (res) {
        options.cancel && options.cancel(res)
      }
    });
    /*
    // 这个方法可以打印比较详细的错误信息, 可以用作出错调试
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
          ...options.param,
          timestamp: options.param.timeStamp
      },
      function(res){
          console.log("getBrandWCPayRequest", res)
      }
    ); 
    */
  }
}