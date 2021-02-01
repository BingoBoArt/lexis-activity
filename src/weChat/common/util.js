import Request from "./request";
import weui from "weui.js";
//判断是否需要绑定
/**
 *
 * @param {*} that
 * @param {*} callback
 * @param {*} options
 *    options.checkAuth 需要验证授权(只需要) 默认true
 *    options.checkBind 需要验证绑定 默认true
 */
function isNeedBind(that, callback, options) {
  console.info("start Request");
  let _options = {
    checkAuth: true,
    checkBind: true,
    ...(options || {})
  };
  if (!_options.noLoading) {
    // that.$loading.show();
  }
  let code = window.L.util.getUrlParam("code");
  /*
    if(code) {
        window.L.cookie.set("code", code);
    }else{
        code = window.L.cookie.get("code") || "";
    }
    */
  let wechat_token = window.L.util.getLocalStorage("wc-tkn") || "";

  new Request({
    url: "/auth/getAuth",
    // mock: require("@/mock/auth"),
    data: {
      url: window.location.href,
      code: code
    },
    headers: {
      "wc-tkn": wechat_token
    },
    type: "POST"
  }).then(res => {
    window.L.util.setLocalStorage(
      "wc-tkn",
      (res.data && res.data["wc-tkn"]) || ""
    );
    window.L.util.setLocalStorage("preUrl", that.$route.path);
    if (res.data && res.data.url) {
      // 授权
      if (_options.checkAuth) {
        window.L.util.setSessionStorage("slientKey", true);
        location.replace(res.data.url);
      }
    } else if (res.code == "1805") {
      // 需要登录
      if (_options.checkBind) {
        that.$router.replace({
          path: "Login"
        });
      }
      if (_options.gotLoading) {
        _options.gotLoading.hide();
      }
    } else if (res.code == "1807") {
      // 需要完善信息
      if (_options.checkBind) {
        that.$router.replace({
          path: "Register2"
        });
      }
    } else {
      // that.$loading.hide();
      callback && callback();
    }
  });
}
//微信支付
function wxPay(that, options) {
  Request({
    url: "/order/create",
    type: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      skuList: [
        {
          skuId: options.skuId || 1000,
          num: options.num || 1
        }
      ],
      users: [options.mobile || ""],
      group: options.isGroup || false,
      groupId: options.groupId || ""
    })
  }).then(function(res) {
    if (!(res.data && res.data.map)) {
      if(options && options.alertFunc){
        options.alertFunc(res.msg || "下单失败")
      }else{
        weui.alert(res.msg || "下单失败");
      }
      that.isLoading = "";
      return;
    }
    window.wx.config({
      appId: "wx4efd25edb778b90d",
      jsApiList: ["chooseWXPay"]
    });

    window.wx.chooseWXPay({
      ...res.data.map,
      timestamp: res.data.map.timeStamp,
      success: function(wxRes) {
        // alert("支付成功ok:" + JSON.stringify(wxRes));
        // 支付成功后的回调函数
        that.isLoading = "";
        window.L.util.setLocalStorage("tradeNo", res.data.tradeNo);
        Request({
          url: "/order/query/buyStatus",
          type: "post",
          data: {
            skuId: options.skuId || 1000
          }
        }).then(res => {
          // console.log(res.data);
          if (res.code == "0000") {
            let groupMobile = res.data.group && res.data.group.groupMobile || "";
            if (res.data.group.isPay == 1 && res.data.group.initiator == 1) {
              that.$router.replace({
                path: "InviteResult",
                query: {
                  groupMobile: groupMobile
                }
              });
            } else {
              that.$router.replace({
                path: "OrderResult",
                query: {
                  groupMobile: groupMobile
                }
              });
            }
          } else {
            // alert(res.msg);
          }
        });
        options.cb && options.cb();
      },
      fail: function(res) {
        // 支付失败后的回调函数
        that.isLoading = "";
        // alert("支付失败error:" + JSON.stringify(res));
        weui.alert("下单失败");
      },
      cancel: function(res) {
        that.isLoading = "";
      }
    });
  });
}
export { isNeedBind, wxPay };
