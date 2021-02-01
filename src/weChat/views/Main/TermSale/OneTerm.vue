<template>
  <div class="perOrder-wrapper">
    <div class="sale-pannel sale-per">
      <div class="title-bar">夏季开学 第一学年课程</div>
      <h2>夏季畅学季，尊享5.5折优惠～</h2>
      <p class="price bold">
        <span class="now">￥3920</span>
        <span class="del">￥7128</span>
      </p>
      <p class="text">1、课时：第一学年，全年72节课时。</p>
      <p class="text"></p>
      <p class="text">2、每周2节课，固定排期。</p>
      <p class="text">3、2人小班，固定优质欧美外教。</p>
    </div>
    <!-- <div class="process">
      <h2>购课流程</h2>
      <div class="process-wrapper">
        <div class='nav'>
        </div>
        <div class="item-wrapper">
          <div class="process-item">
            <i class="num">1</i>
            <h3>阅读用户购买协议</h3>
          </div>
          <div class="process-item">
            <i class="num">2</i>
            <h3>点击购课</h3>
            <p>享4.9折购第一学年精选课，实付价格¥3528。</p>
            <p>用户需首先完成试听课（请在“兰思英语”公众号联系助教）。</p>
          </div>
          <div class="process-item">
            <i class="num">3</i>
            <h3>确认支付</h3>
            <p>请在确认金额后，完成支付。</p>
          </div>
          <div class="process-item">
            <i class="num">4</i>
            <h3>等待排课</h3>
            <p>完成支付后，助教会与您沟通上课时间。</p>
          </div>
        </div>
      </div>
    </div> -->
    <a href="javascript:" class="main-btn weui-btn_plain-disabled btn_loading com-btn" v-if='ableClick' @click='buy'>
      <i v-bind:class="isLoading"></i>支付 ¥3920</a>
    <!-- <a href="javascript:" class="main-btn weui-btn_plain-disabled com-btn" v-if='!ableClick' @click="hint">
      <i v-bind:class="isLoading"></i>支付 ¥10240</a> -->
    <div class="bottom-tip" @click="goProtocol">*用户购买协议</div>
  </div>
</template>
<script>
import Request from "@/common/request";
import { wxPay, isNeedBind } from "@/common/util";
import { routerReplace } from "@/common/vueCommon.js";
import weui from "weui.js";
export default {
  data: () => {
    return {
      hasTest: "",
      isLoading: "",
      ableClick: true
    };
  },
  methods: {
    buy() {
      let that = this;
      that.isLoading = "weui-loading";
      Request({
        url: "/user/audition/status",
        type: "post",
        // mock: require("@/mock/testStatus"),
        data: {
          self: true
        }
      }).then(res => {
        console.log(res.code);
        if (res.code == 0) {
          wxPay(this, { skuId: 1001 });
        } else {
          that.isLoading = "";
          weui.alert(
            "您尚未完成试听课，请首先在“兰思英语”公众号联系助教完成试听。"
          );
        }
      });
      // weui.alert("很抱歉，兰思英语官方支付系统升级中，<br/>请联系您的专属助教了解支付相关信息。<br/>感谢您的理解与支持！")
    },
    goProtocol() {
      routerReplace(this, "TermProtocol", true);
    }
  },
  created: function() {
    let that = this;
    this.$loading.show();
    isNeedBind(that, function() {
      that.$loading.hide();
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.perOrder-wrapper {
  padding-bottom: 50px;
  overflow: hidden;
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  color: white;

  .sale-pannel {
    .text {
      text-align: left;
      margin: 17px auto;
      padding: 0;
    }
  }

  .main-btn {
    margin: 80px auto 20px;
  }

  .bottom-tip {
    font-size: 20px;
    margin: 20px auto;
    color: #7b7b7b;
  }
}
</style>

