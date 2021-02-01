<template>
  <div class="register">
    <div class="register-wrapper">
        <div class="register-content">
            <div class="register-inp register-tel">
              <p>手机号：</p>
              <input class="in1" v-model="formData.inputPhone" id="registerAccount" type="number" maxlength="11" placeholder="手机号" emptyTips="请输入手机号">
            </div>
            <div class="register-yanzheng">
              <p>验证码：</p>
              <input class="in1" v-model="formData.valiCode" type="number" id="valiCode" placeholder="验证码" emptyTips="请输入验证码">
              <lemon-countdown class="getCode weui-btn" formate="ss秒" :seconds="60" :begin="countdown_begin" initText="发送验证码" @click="getCode" @over="onCountDownOver"></lemon-countdown>
            </div>
            <div class="register-agree">
                <!-- <input id="lexisAgree" name="checkbox" checked="isChecked" type="checkbox" @click="checkClick"> -->
                <label for="lexisAgree"> <span  class='tips-agree'><router-link to="/Protocol">点击“登录”即同意《使用协议》</router-link></span></label> 
            </div>
            <div class="register-footer">
              <lemon-button class="register-submit btn-max" @click="login" id="showTooltips" :loading="is_op_ing">登录</lemon-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import Request from "@base/common/request";
  import LemonUtils from 'lemon-utils';

  export default {
    name: "Register",
    components: {
    },
    data: () => {
      return {
        isChecked: true,
        is_op_ing: false,
        formData: {
          inputPhone: "",
          valiCode: ""
        },
        countdown_begin: false
      };
    },
    methods: {
      login() {
        let that = this;
        let formData = that.formData;
        let openId = LemonUtils.getLocalStorage("we-openid");
        if(that.is_op_ing) {
          return;
        }
        if(!(/^1[0-9]{10}$/.test(formData.inputPhone))){
          that.$toast("请输入正确的手机号");
          return;
        }
        if(!(/^[0-9]{6}$/.test(formData.valiCode))){
          that.$toast("请输入6位的验证码");
          return;
        }
        //向后台发送数据校验
        that.is_op_ing = true;
        Request({
          url: "/login/v1",
          data: {
            mobile: formData.inputPhone,
            validCode: formData.valiCode,
            userType: 1,
            openId: openId,
            source: "WeChat"
          },
          type: "POST"
        }).then(res => {
          // console.log(res.data.token)
          if (res.code == "0000") {
            that.$toast("登录成功");
            LemonUtils.setLocalStorage(
              "we-openid",
              (res.data && res.data.openId ? res.data.openId : '')
            );
            LemonUtils.setLocalStorage("we-token", (res.data && res.data.token ? res.data.token : ''));
            let preUrl = LemonUtils.getLocalStorage("preUrl") || "login";
            console.log("这是登录成功跳到的路由", preUrl)
            that.$router.replace({
              path: preUrl
            });
          } else {
            that.$toast(res.msg || "登录失败，请稍候重试");
          }
        }).always(() => {
          that.is_op_ing = false;
        })
      },
      checkClick() {
        this.isChecked = !this.isChecked;
      },
      onCountDownOver() {
        this.countdown_begin = false;
      },
      getCode() {
        if(this.countdown_begin){
          return false;
        }
        let reg = /^1\d{10}$/;
        if (!reg.test(this.formData.inputPhone)) {
          this.$toast("请先输入正确的手机号");
        } else {
          let that = this;
          that.countdown_begin = true;
          new Request({
            url: "/sms/send",
            data: {
              mobile: that.formData.inputPhone,
              type: 'login_reg'
            },
            type: "POST"
          }).then(res => {
            if (res.code == "0000") {
            } else {
              this.$toast(res.msg || "系统错误，请稍后重试！");
              this.countdown_begin = false;
            }
          });
        }
      }
    },
    created: function () {
      this.$loadingCloseAll();
    },
    mounted: function () {}
  };
</script>
<style lang='less' scoped>
.register{
  width: 100%;
  min-height: 100%;
  background: #ebb7a3 url('./images/bg_img.jpg') left top no-repeat;
  background-size: 100%;
  .register-wrapper{
      width: 100%;
      .register-content{
        width: 100%;
        padding-top: 320px;
        .register-header{
          height: 45px;
          line-height: 45px;
          margin-left: 60px;
          font-size: 32px;
          color: #fff;
          font-family: "PingFang SC";
        }
        .register-tel{
            margin-top: 46px;
        }
        
        .register-inp{
          width: 100%;
          height: 80px;
          display: flex;
          margin-top: 40px;
          p{
            width: 170px;
            margin-left: 60px;
            font-size: 32px;
            color: #fff;
            font-family: "PingFang SC";
            opacity: 0.5;
            line-height: 80px;
            text-align: right;
          }
          input{
            width: 455px;
            height: 80px;
            border-radius: 6px;
            background: #fff;
            border: none;
            margin-left: 3px;
            font-size: 28px;
            text-indent: 12px;
          }
        }
        .register-yanzheng{
          width: 100%;
          height: 80px;
          display: flex;
          margin-top: 46px;
          p{
            width: 170px;
            margin-left: 60px;
            font-size: 32px;
            color: #fff;
            font-family: "PingFang SC";
            opacity: 0.5;
            line-height: 80px;
            text-align: right;
          }
          input{
            width: 230px;
            height: 80px;
            border-radius: 6px;
            background: #fff;
            border: none;
            margin-left: 3px;
            text-indent: 12px;
            font-size: 28px;
          }
          button{
            width: 200px;
            height: 80px;
            border-radius: 6px;
            margin-left: 24px;
            color: #1E5546;
            font-size: 26px;
            border: none;
            background: #C3E1E1;
          }
        }
        .register-agree{
          // width: 400px;
          height: 36px;
          display: flex;
          margin-top: 40px;
          margin-left: 235px;
          background: none;
          align-items: center;
          label{
            color: #fff;
            font-size: 26px;
            opacity: 0.7;
            font-family: "PingFang SC";
            line-height: 36px;
            // margin-left: 18px;
            a{
              color: #fff;
              text-decoration: underline;
            }
          }
            input{
              width: 30px;
              height: 30px;
              box-sizing: border-box;
              border: 2px solid #ffffff;/*no*/
              background: #fff;
              opacity: 0.3;
              border-radius: 6px;
              margin-bottom: 3px;
            }
        }
        .register-footer{
          width: 100%;
          height: 165px;
          // margin-left: 235px;
           margin-top: 140px;
          .register-submit{
              width: 600px;
              height: 100px;
              color: #fff;
              font-size: 40px;
              border: none;
              border-radius: 50px;
              border:1px solid #979797;
              display: block;
              margin: auto;
              text-align: center;
              line-height: 100px;
              background: linear-gradient(to right, #FF5A5F ,#E46076,#C8668E,#B16BA1,#A96DA8, #9671B9,#7877D2,#4383FF); /* 标准的语法 */
          }
          .register-login{
            height: 40px;
            color: #fff;
            text-decoration: underline;
            margin-top: 25px;
            text-align: center;
            font-size: 26px;
            margin-bottom: 25px;
          }
        }
      }
      
  }
}
#lexisAgree{
  top: 0;
}
</style>
