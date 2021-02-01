<template>
    <div class="main-wrap">
        <section class="top-wrap">
            <img class="vip-pic" src="~@/assets/img/wdw_vip_monthfreetitle.png" alt="">
            <div v-if="!isVip">
                <p class="tips-title-h">请输入VIP验证码</p>
                <div class="vip-input-wrap">
                    <img src="~@/assets/img/vip_icn_code.png" alt="">
                    <input placeholder="VIP验证码" class="vip-input" maxlength="8" v-model="vip_code" type="text">
                </div>
                <div href="javascript:void(0)" class="btn-wrap" @click="getVip()"></div>
            </div>
            <div v-else>
                <p class="tips-title-h">您已经成功领取1个月免费VIP特权</p>
                <p class="vip-code">{{card_code}}</p>
                <p class="tips-ps">
                    每个用户只限使用一个验证码，每个验证码只能使用一次。
                </p>
            </div>
        </section>
        <section class="tips-wrap">
            <img class="tips-title" src="~@/assets/img/wdw_vip_monthfreetitle2.png" alt="">
            <ul>
                <li>第一步：关注"英语天天见"微信公众号。</li>
                <li>第二步：联系官方客服，索取验证码。</li>
            </ul>
            <img class="tips-title" src="~@/assets/img/wdw_vip_monthfreetitle3.png" alt="">
            <ul>
                <li>第一步：进入"英语天天见"APP首页，点击"VIP"按钮或点击活动轮播图，进入领取界面。</li>
                <li>第二步：输入验证码，点击"领取"。</li>
                <li>第三步：VIP有效期自动延长。</li>
            </ul>
        </section>
    </div>
</template>
<script>
  import Request from "@/common/request.js";
  import AppHandle from "@/common/appHandle.js";
  import Events from "@/common/events.js";
  import Tip from "@/components/tip/index.js";

  export default {
    name: 'GetVip',
    components: {},
    data: () => {
      return {
        width: 1200,
        height: 800,
        vip_code: '',
        userInofo: {},
        isVip: false,
        token: '',
        card_code: ''
      }
    },
    methods: {
      getVip() {
        let vip_code = this.vip_code;
        let token = this.token;
        let self = this;
        if(!vip_code){
          Tip.error('请您输入验证码');
          return;
        }
        Request({
          headers: {
            token: token
          },
          url: '/liveapi/coupon/use',
          type: 'post',
          data: {
            couponCode: vip_code
          }
        }).then((res) => {
          if (res.code == 0) {
            self.selectVip();
            Tip.success('领取成功');
          } else {
            Tip.error(res.msg);
          }
        })
      },
      selectVip() {
        let token = this.token;
        Request({
          headers: {
            token: token
          },
          url: '/liveapi/coupon/getCode',
          type: 'post'
        }).then((res) => {
          if (res.code == 0) {
            if(res.data.code){
              this.isVip = true;
              this.card_code = res.data.code;
            }else {
              this.isVip = false;
            }
          } else {
            Tip.error(res.msg);
          }
        })
      }
    },
    created: function () {
      let that = this;
      Events.on("get_userInfo", (data) => {
        console.log("get_userInfo", data);
        that.token = data.token;
        that.selectVip();
      });
      AppHandle().init();

      $(window).resize(function () {
        var w_w = $(window).width();
        var w_h = $(window).height();
        that.width = w_w;
        that.height = w_h;
      }).resize();
      // 从App获取userInfo
    },
    mounted: function () {
      this.$loading.hide();
    }
  }
</script>
<style scoped>
    @import "~@/assets/css/common/index.less";
    * {
        touch-action: none;
    }
    html, body {
        overflow: hidden;
    }
    .main-wrap {
        -webkit-user-select: none;
        width: 100%;
        height: 100%;
        min-height: 1110px;
        box-sizing: border-box;
        /*background: url("../../assets/img/wdw_vip_bg.png") no-repeat center center;*/
        /*background-size: 100% 100%;*/
        overflow: auto;
        background: #ffe983;
    }

    .vip-pic {
        width: 100%;
        margin-top: 40px;
    }

    .bg-wrap {

    }

    .iconfont {
        font-size: 32px; /*px*/
        border-radius: 50%;

    }

    .icon-wrap {
        width: 200px;
        height: 200px;
    }

    input {
        border: none;
        background: none;
        outline: none;
        -webkit-appearance: none;
    }

    p.vip-code {
        color: #e23851;
        font-size: 48px; /*px*/
        font-weight: bold;
    }

    p.tips-ps {
        color: #91432f;
        font-size: 24px; /*px*/
        line-height: 1.5;
        padding: 0 50px;
        text-align: left;
    }

    .vip-input-wrap {
        display: block;
        width: 450px;
        margin: 0 auto 20px;
        height: 96px;
        line-height: 96px;
        background-color: #fff;
        font-size: 36px; /*px*/
        border: 1px solid #e9c071; /*no*/
        border-radius: 10px; /*px*/
        text-align: left;
        padding-left: 20px;
        display: flex;
        flex-flow: row;
        overflow: hidden;
    }

    .vip-input-wrap img {
        width: 62px;
        height: 62px;
        margin-top: 14px;
    }

    .vip-input-wrap input {
        flex: 1;
        height: 100%;
        text-indent: 10px;
        background-color: #fff;
        color: #884327;
    }

    p.tips-title-h {
        color: #884327;
        font-size: 38px; /*px*/
        margin: 36px auto 10px;
    }

    img.tips-title {
        display: block;
        width: 470px;
        margin: 40px auto 10px;
    }

    .top-wrap {
        text-align: center;

    .btn-wrap {
        display: block;
        height: 70px;
        width: 418px;
        margin: 0 auto;
        background: url("~@/assets/img/vip_btn_validate.png") no-repeat;
        background-size: 100% 100%;
    }

    .btn-wrap:active {
        background: url("~@/assets/img/vip_btn_validate_an.png") no-repeat;
        background-size: 100% 100%;
    }

    }
    .close {
        display: block;
        width: 154px;
        height: 154px;
        margin: 24px auto 0;
    }

    .tips-wrap {
        padding: 10px;
        font-size: 30px; /*px*/
        color: #555;

    p {
        line-height: 1.5;
    }

    }
    ul {
        padding: 10px 40px 0;

    li {
        color: #91432f;
        font-size: 28px; /*px*/
        line-height: 1.5;
    }

    }
</style>

