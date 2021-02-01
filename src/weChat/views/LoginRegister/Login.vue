<template>
  <div class="wrapper bind-wrapper">
    <div class="content">
      <div class="logo"></div>
    </div>
    <form id="form">
      <div class="inputWrapper">
        <span class="account"></span>
        <input class="weui-input in1" required pattern="REG_IDNUM" placeholder="输入你的帐号" emptyTips="请输入帐号" notMatchTips="请输入1-12位账户名(字母和数字)"
          id="account-login">
      </div>
      <div class="inputWrapper">
        <span class="password"></span>
        <input type="password" id="password-login" class="weui-input in1" placeholder="输入你的密码" required pattern="REG_IDNUM"
          emptyTips="请输入密码" notMatchTips="请输入6-12位密码(字母和数字)">
      </div>
      <a class="weui-btn weui-btn_primary btn1" href="javascript:" @click="loadUser" id="showTooltips">确认登录</a>
    </form>
    <div class="bottomTip">还没帐号？
      <div @click="login" class="register">立即注册</div>
    </div>
  </div>
</template>
<script>
  import Request from "@/common/request";
  import weui from "weui.js";
  export default {
    name: "TestTool",
    components: {},
    data: () => {
      return {};
    },
    methods: {
      loadUser() {
        let that = this;
        weui.form.validate(
          "#form",
          function (error) {
            if (!error) {
              var md5 = require("blueimp-md5");
              var loading = weui.loading("登录中...");
              let accountLogin = $("#account-login").val();
              let passwordLogin = md5($("#password-login").val());
              new Request({
                url: "/auth/userLogin",
                data: {
                  mobile: accountLogin,
                  password: passwordLogin
                },
                type: "POST"
              }).then(res => {
                if (res.code == "0000") {
                  let preUrl = window.L.util.getLocalStorage("preUrl") || "";
                  // let preUrl = window.L.cookie.get("preUrl");
                  // if (preUrl == "/TestClass"){
                  //   weui.toast("领取成功", 3000);
                  // }
                  if (preUrl) {
                    that.$router.replace({
                      path: preUrl
                    });
                  }
                  loading.hide();
                  weui.toast("登录成功", 3000);
                } else if (res.code == "1134") {
                  loading.hide();
                  let alertDom = weui.alert(
                    "该帐号不存在,请核实",
                    function () {
                      alertDom.hide();
                    }, {
                      title: ""
                    }
                  );
                  setTimeout(function () {
                    alertDom.hide();
                  }, 2000);
                } else if (res.code == "1701") {
                  loading.hide();
                  let alertDom = weui.alert(
                    "请输入正确密码",
                    function () {
                      alertDom.hide();
                    }, {
                      title: ""
                    }
                  );
                  setTimeout(function () {
                    alertDom.hide();
                  }, 2000);
                } else if (res.code == "1809") {
                  loading.hide();
                  let alertDom = weui.alert(
                    "该微信已经绑定过其他账户",
                    function () {
                      alertDom.hide();
                    }, {
                      title: ""
                    }
                  );
                  setTimeout(function () {
                    alertDom.hide();
                  }, 2000);
                } else {
                  loading.hide();
                  let alertDom = weui.alert(
                    "未知错误请联系管理员",
                    function () {
                      alertDom.hide();
                    }, {
                      title: ""
                    }
                  );
                  setTimeout(function () {
                    alertDom.hide();
                  }, 2000);
                }
              });
            }
            // return true; // 当return true时，不会显示错误
          }, {
            regexp: {
              IDNUM: /^[A-Za-z0-9]{1,12}$/,
              VCODE: /^.{4}$/
            }
          }
        );
      },
      login() {
        this.$router.push({
          path: "Register"
        });
      }
    },
    created: function () {
      this.$loading.hide();
    },
    mounted: function () {}
  };
</script>
<style lang='less' scoped>
  @import "../../assets/css/common/variable.less";
  .bind-wrapper {
    background: white;
    .inputWrapper {
        position: relative;
        text-align: center;
        span {
            left: 90px;
            top: 37px;
            position: absolute;
            display: inline-block;
            height: 45px;
            width: 45px;
            background-size: cover;
        }
        .mod {
            top: 23px;
        }
        span {
            margin-right: 20px;
        }
    }
    .password {
        background: url('../../assets/images/password.png');
    }
    .account {
        background: url("../../assets/images/account.png")
    }
    a {
        width: 600px;
        height: 70px;
    }
    #form {
        margin-top: 50px;
    }
    .content {
        width: 100%;
        height: 300px;
        padding-top: 200px;
        background: @bgColor;
        .logo {
            width: 420px;
            height: 144px;
            background: url('../../assets/images/logoTitle.png');
            background-size: cover;
            margin: 0 auto;
        }
        .text {
            text-align: center;
            font-size: 40px;
            padding-top: 40px;
        }
    }
    .in1 {
       width: 500px;
        height: 80px;
        border: 1px solid grey;
        border-radius: 10px;
        position: relative;
        margin: 20px auto 0;
        padding-left: 100px;
        font-size: @rootFontSize;
        div {
            line-height: 82px;
        }
    }
    .btn1 {
        margin-top: 20px;
        height: 80px;
        font-size: @rootFontSize;
    }
    .bottomTip {
        text-align: center;
        margin: 15px auto 0;
    }
    .register {
        display: inline-block;
        color: @color;
    }
}
</style>
