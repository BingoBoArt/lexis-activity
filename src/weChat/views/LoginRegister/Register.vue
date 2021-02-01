<template>
  <div class="wrapper register-wrapper">
    <v-title>注册页</v-title>
    <div class="content">
      <div class="logo"></div>
    </div>
    <form id="form">
      <div class="inputWrapper">
        <span class="tel"></span>
        <input class="weui-input in1" v-model="formData.inputPhone" id="registerAccount" type="number" maxlength="11"
          required pattern="[0-9]{11}" placeholder="请输入手机号" emptyTips="请输入手机号" notMatchTips="请输入格式正确的手机号">
      </div>
      <div class="inputWrapper">
        <span class="password"></span>
        <input class="weui-input in1" v-model="formData.inputPassword1" id="registerPassword1" type="password" maxlength="11"
          required pattern="REG_PASSWORD" placeholder="请设置密码" notMatchTips="请输入6-12位密码(字母和数字)  " emptyTips="请设置密码">
      </div>
      <div class="inputWrapper">
        <span class="password"></span>
        <input class="weui-input in1" v-model="formData.inputPassword2" id="registerPassword2" type="password" placeholder="请再次确认密码"
          emptyTips="请再次确认密码">
      </div>
      <div class="inputWrapper">
        <span class="valicode"></span>
        <input class="weui-input in1" v-model="formData.valiCode" type="number" required pattern="REG_VALICODE" id="valiCode"
          placeholder="请输入验证码" emptyTips="请输入验证码" notMatchTips="请输入6位验证码">
        <div class="getCode weui-btn" @click="getCode">{{buttonState}}</div>
      </div>
      <div class="inputWrapper">
        <label for="weuiAgree" class="weui-agree">
          <input id="lexisAgree" type="checkbox" class="weui-agree__checkbox" @click="checkClick">
          <div class="weui-agree__text agree_text" id="lexisText">
            阅读并同意
            <router-link to="/Protocol">《兰思英语用户注册协议》</router-link>
          </div>
        </label>
      </div>
      <a class="weui-btn weui-btn_primary btn1" href="javascript:" @click="register" id="showTooltips">立即注册</a>
    </form>
    <div style="width:100%;height:20px;"></div>
    <!-- <p>若未接收到验证码，可尝试 <span class="special" @click="getSoundValidate">语音接听验证码</span></p> -->
    <!-- <div class="bottomTip"><router-link to="Login">已有账户 直接登录</router-link></div> -->
  </div>
</template>

<script>
  import Request from "@/common/request";
  import weui from "weui.js";
  import VTitle from "../../components/Title";
  export default {
    name: "Register",
    components: {
      VTitle
    },
    data: () => {
      return {
        buttonState: "获取验证码",
        count: 60,
        isChecked: false,
        formData: {
          inputPhone: "",
          inputPassword1: "",
          inputPassword2: "",
          valiCode: ""
        }
      };
    },
    methods: {
      register() {
        let that = this;
        let formData = that.formData;
        let md5 = require("blueimp-md5");
        weui.form.validate(
          "#form",
          function (error) {
            if (!error) {
              if (formData.inputPassword1 !== formData.inputPassword2) {
                weui.alert("两次输入密码不一致！");
              } else {
                let checkValue = that.isChecked;
                if (checkValue) {
                  let loading = weui.loading("提交中...");
                  loading;
                  //向后台发送数据校验
                  new Request({
                    url: "/auth/register",
                    data: {
                      mobile: formData.inputPhone,
                      password: md5(formData.inputPassword1),
                      validcode: formData.valiCode
                    },
                    type: "POST"
                  }).then(res => {
                    if (res.code == "0000") {
                      loading.hide();
                      weui.toast("提交成功", 3000);
                      that.$router.push({
                        path: "Register2"
                      });
                    } else if (res.code == "1111") {
                      loading.hide();
                      var alertDom = weui.alert(
                        "该手机号已注册,请登录",
                        function () {
                          alertDom.hide();
                        }, {
                          title: ""
                        }
                      );
                      setTimeout(function () {
                        alertDom.hide();
                      }, 2000);
                    } else if (res.code == "1116") {
                      loading.hide();
                      weui.toast("验证码错误", 3000);
                    } else {
                      loading.hide();
                      weui.toast(res.msg || "注册失败", 3000);
                    }
                  });
                } else {
                  weui.alert("请先同意《兰思英语用户注册协议》");
                }
              }
            }
            // return true; // 当return true时，不会显示错误
          }, {
            regexp: {
              PASSWORD: /^[A-Za-z0-9]{6,12}$/,
              VCODE: /^.{4}$/,
              VALICODE: /^\d{6}$/
            }
          }
        );
      },
      checkClick() {
        this.isChecked = !this.isChecked;
      },
      getCode() {
        let reg = /^1[34578]\d{9}$/;
        if (!reg.test(this.formData.inputPhone)) {
          weui.alert("请先输入正确的手机号");
        } else {
          let that = this;
          new Request({
            url: "/sms/send",
            data: {
              mobile: that.formData.inputPhone,
              cmd: 4
            },
            type: "POST"
          }).then(res => {
            if (res.code == "0000") {
              console.log("valicode send");
            }
          }); //待优化
          if (that.buttonState == "获取验证码") {
            window.clearInterval(countNum);
            that.count = 60;
            let countNum = setInterval(function () {
              if (that.count > 0) {
                that.buttonState = "已发送" + that.count-- + "s";
              } else {
                window.clearInterval(countNum);
                that.buttonState = "获取验证码";
              }
            }, 1000);
          } else {
            console.log("已发送...");
          }
        }
      }
      // getSoundValidate() {
      //   console.log("语音验证");
      // }
    },
    created: function () {
      this.$loading.hide();

      // weui.toast("注册失败", 300000);
      // weui.alert("请先同意《兰思英语用户注册协议》");
      // weui.loading("提交中...");
    },
    mounted: function () {}
  };
</script>
<style>
  @import "../../assets/css/common/variable.less";
.register-wrapper {
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
            background: url('../../assets/images/logoTitle.png');
            width: 420px;
            height: 144px;
            background-size: cover;
        }
    }
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
    }
    .tel {
        background: url('../../assets/images/phone.png');
    }
    .password {
        background: url('../../assets/images/password.png');
    }
    .valicode {
        background: url("../../assets/images/valicode.png") 90% 90%;
    }
    .getCode {
        position: absolute;
        display: inline-block;
        width: 180px;
        height: 65px;
        line-height: 65px;
        top: 27px;
        right: 90px;
        border-radius: 10px;
        font-size: 25px;
        background: @color;
    }
    background: white;
    a {
        width: 600px;
        margin-top: 20px;
    }
    .content {
        width: 100%;
        height: 450px;
        margin: 0 auto 0;
        background: @bgColor;
    }
    #form {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .validate {
        margin: 10px auto 0;
        font-size: 20px;
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
    .weui-btn .btn1 {
        height: 80px;
        font-size: @rootFontSize;
        background: @color;
        margin-top: 20px;
    }
    p {
        text-align: center;
        margin-top: 30px;
    }
    p>span {
        display: inline-block;
        width: 200px;
    }
    .bottomTip {
        margin: 20px auto 10px;
        font-size: @rootFontSize;
        text-align: center;
    }
    .agree_text{
      font-size: 30px;
      margin-top: 10px;
    }
}
</style>
