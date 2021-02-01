<template>
  <div class="perOrder-wrapper">
    <div class="sale-pannel sale-per">
      <div class="title-bar">个人购课明细</div>      
      <h2>个人购全年精选课</h2>
      <p class="price bold">
        <span class="now">￥10240</span>
        <!-- <span class="del">￥10240</span> -->
      </p>
      <p class="text">1、全年80节课：64节绘本故事＋8节强化＋8节科学阅读。</p>
      <p class="text"></p>
      <p class="text">2、每周2节，固定排期。</p>
      <p class="text">3、4人小班，固定优质欧美外教。</p>
    </div>
    <div class="process">
      <h2>购课流程</h2>
      <div class="process-wrapper">
        <div class='nav'>
        </div>
        <div class="item-wrapper">
          <div class="process-item">
            <i class="num">1</i>
            <h3>点击购课</h3>
            <p>享全年精选课，实付总价¥10240。</p>
            <p>用户需首先完成试听课（请在“兰思英语”公众号联系助教）。</p>
          </div>
          <div class="process-item">
            <i class="num">2</i>
            <h3>确认支付</h3>
            <p>请在点击购课后，完成支付。</p>
          </div>
          <div class="process-item">
            <i class="num">3</i>
            <h3>等待排课</h3>
            <p>支付完成后，助教会与您沟通上课时间。</p>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:" class="main-btn btn_loading com-btn" v-if='ableClick' @click='buy'>
      <i v-bind:class="isLoading"></i>支付 ¥10240</a>
    <a href="javascript:" class="main-btn weui-btn_plain-disabled com-btn" v-if='!ableClick' @click="hint">
      <i v-bind:class="isLoading"></i>支付 ¥10240</a>
    <div class="bottom-tip">*同一用户只支持购买“个人购课”或者“团购购课”。</div>
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
          wxPay(this, 1000, 1, function() {});
        } else {
          that.isLoading = "";
          weui.alert("您尚未完成试听课，请首先在“兰思英语”公众号联系助教完成试听。");
        }
      });
    },
    hint() {
      weui.alert("您已存在“团购购课”订单<br>无法参加“个人购课”。");
    }
  },
  created: function() {
    let that = this;
    this.$loading.show();
    isNeedBind(that, function() {
      new Request({
        url: "/order/query/buyStatus", //购买状态判断
        // mock: require("@/mock/purchaseStatus.js"),
        type: "POST",
        data: {
          skuId: 1000
        }
      }).then(res => {
        // that.purCharseStatus = res.code
        let personal_status = res.data.personal || {};
        let group_status = res.data.group || {};
        console.log(res.msg);
        if (personal_status.isPay) {
          routerReplace(that, "OrderResult");
        } else if (personal_status.hasOrder) {
          // 有未支付的个人订单
          that.$loading.hide();
        } else if (group_status.isPay) {
          that.ableClick = false;
          weui.alert("您已存在“团购购课”订单<br>无法参加“个人购课”。");
          that.$loading.hide();
        } else if (group_status.hasOrder) {
          // 有未支付的团购订单
          that.$loading.hide();
        } else {
          that.$loading.hide();
        }

        // if (res.data.type == 1 && res.data.isPay == 0) {
        //   //有未支付的个人订单
        //   that.$loading.hide();
        // } else if (res.data.type == 1 && res.data.isPay == 1) {
        //   //个人订单已完成
        //   // routerReplace(that, "OrderResult");
        //   that.ableClick = false;
        //   weui.alert("您已存在已完成的个人订单！");
        // } else if (res.data.type == 2) {
        //   //团购订单
        //   if (res.data.groupStatus == 2) {
        //     // routerReplace(that, "OrderResult"); //团购已完成
        //     that.ableClick = false;
        //     weui.alert("您已存在已完成的团购订单！");
        //   } else if (res.data.initiator && res.data.isPay == 0) {
        //     //发起者未支付
        //     // routerReplace(that, "TeamInfo");
        //     that.$loading.hide();
        //   } else if (res.data.initiator && res.data.isPay == 1) {
        //     //发起者已经支付
        //     routerReplace(that, "InviteResult");
        //   } else if (!res.data.initiator && res.data.isPay == 0) {
        //     //被邀请未支付
        //     routerReplace(that, "TeamInfo");
        //   } else if (!res.data.initiator && res.data.isPay == 1) {
        //     //被邀请者已支付
        //     that.ableClick = false;
        //     weui.alert("您已存在已完成的团购订单！");
        //     // routerReplace(that, "OrderResult");
        //   }
        // } else if (res.data.type == 0) {
        //   //正常流程
        //   that.$loading.hide();
        // }
      });
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

  .bottom-tip{
    font-size: 20px;
    margin: 20px auto;
    color:#7b7b7b;
  }
}
</style>
