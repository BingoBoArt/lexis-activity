<template>
  <div class="wrapper test-wrapper">
    <div class="content">
      <div class='pic'></div>
    </div>
    <div class="tip" v-if="ableGot">
      <p class="strong-tip">注册即可免费预约试听课</p>
      <p>免费申请1对4精英小班试听课</p>
      <p>体验超地道、超好玩的英语课！</p>
    </div>
    <a v-if="ableGot" class="weui-btn weui-btn_primary btn_yellow btn1" href="javascript:" @click="getFree">立即领取</a>
    <a v-if="!ableGot" class="weui-btn btn1  weui-btn_plain-disabled" href="javascript:" @click="hasGot">已经领取</a>
    <p class="text" v-if="!ableGot">免费试听课领取成功！我们会稍后与您取得联系。如有需求，请联系助教～</p>
    <div class="deviceInfo">
      <p class="strong-tip top">设备须知</p>
      <div>
        <div style="display:inline-block" class="mar">
          <img src="../../assets/images/ipad.png" alt="">
          <p class="ipad">仅支持iPad设备</p>
        </div>
        <div style="display:inline-block">
          <img src="../../assets/images/wifi.png" alt="" class="im2">
          <p>稳定的WIFI</p>
        </div>
      </div>
      <p class="strong-tip top">上课须知</p>
      <div class="process">
        <div v-for="(item,index) in processes" v-bind:key='index'>
          <div class="step" v-bind:key="index">{{item}}</div>
          <img src="../../assets/images/arrow-down.png" alt="" class="arrow">
        </div>
        <div class="step">Step6. 按时上课</div>
      </div>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request";
// import "weui";
import { isNeedBind } from "../../common/util";
import weui from "weui.js";
export default {
  name: "TestClass",
  components: {},
  data: () => {
    return {
      ableGot: true,
      processes: [
        "Step1.  关注微信公众号",
        "Step2.  分配专属助教",
        "Step3.  完成外教试听课",
        "Step4.  匹配外教&安排精英小班",
        "Step5.  确认排课"
      ]
    };
  },
  methods: {
    getFree() {
      //request
      let that = this;
      let loading = weui.loading("加载中...");
      // isNeedBind(this, function() {
      // console.log("123");
      // that.$loading.show();
      loading;
      new Request({
        url: "/audition/get", //调取课程领取信息
        data: {},
        type: "POST"
      })
        .then(res => {
          // console.info(res);
          if (res.code == "0000" || res.code == "1901") {
            that.ableGot = false;
            weui.toast("领取成功", 1000);
          } else {
            weui.toast("领取失败", 1000);
          }
        })
        .always(function() {
          // that.$loading.hide();
          loading.hide();
        });
      //  }
      //  true,
      //  loading
      //);
    },
    hasGot() {
      // weui.alert("已经领取");
    }
  },
  created: function() {
    let that = this;
    isNeedBind(that, function() {
      that.$loading.show();
      new Request({
        url: "/audition/check", //调取课程领取信息
        type: "POST"
      })
        .then(res => {
          if (res.code == "1901") {
            // 已经领取
            that.ableGot = false;
          }
        })
        .always(function() {
          that.$loading.hide();
        });
    });
    /*
        this.$loading.show();
        let that = this;
        let code = window.L.util.getUrlParam("code");
        new Request({
          url: "/audition/check", //调取课程领取信息
          data: {
            code: code
          },
          type: "POST"
        })
          .then(res => {
            window.L.util.setLocalStorage('wc-tkn', res.data && res.data['wc-tkn'] || "");
            // window.L.cookie.set("wc-tkn", res.data && res.data['wc-tkn'] || "");
            console.info(res);
            if (res.code == "1901") {
              // 已经领取
              that.ableGot = false;
            }else if(code && res.data && res.data['wc-tkn']){
              // 未领取，但是刚从授权回来, 直接领取
              that.getFree();
            }
          })
          .always(function() {
            that.$loading.hide();
          });
          */
  },
  mounted: function() {}
};
</script>
<style lang='less' scoped>
@import "../../assets/css/common/variable.less";
.test-wrapper {
  .content {
    background: @bgColor;
    width: 100%;
    height: 320px;
    overflow: hidden;
    .pic {
      background: url("../../assets/images/logoTitle.png") no-repeat;
      background-size: contain;
      width: 420px;
      height: 144px;
      margin: 100px auto 30px;
    }
  }
  .tip {
    text-align: center;
    color: #252323;
    font-size: 29px;
    margin-top: 70px;
    padding: 0 40px;
    p {
      margin: 16px 0;
    }
    .strong-tip {
      font-size: 36px;
      font-weight: 600;
    }
  }
  a {
    margin-top: 1.33333333rem;
    width: 8.13333333rem;
    height: 1.26666667rem;
    background: #deb419;
    line-height: 1.26666667rem;
    font-size: 0.50666667rem;
  }
  .text {
    padding: 50px 50px 10px;
    font-size: 26px;
    color: #333;
    line-height: 40px;
  }
  .deviceInfo {
    text-align: center;
    padding-bottom: 150px;
    color: #f99231;
    img {
      width: 110px;
      height: 110px;
    }
    .arrow {
      width: 60px;
      height: 60px;
    }
    .top {
      margin-top: 70px;
      margin-bottom: 30px;
    }
    .step {
      width: 550px;
      height: 90px;
      line-height: 90px;
      border: 3px solid black;
      border-radius: 20px;
      margin: 0 auto;
      font-size: 30px;
    }
    .mar {
      margin-right: 150px;
    }
  }
  .process {
    text-align: center;
  }
}
</style>
