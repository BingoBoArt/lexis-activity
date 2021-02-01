<template>
  <div class="teamOrder-wrapper">
    <div class="sale-pannel">
      <div class="title-bar">双人团购明细</div>      
      <h2>双人88折购全年精选课</h2>
      <p class="bold price">
        <span class="now">￥9011</span><span class="del">￥10240</span>
      </p>
      <p class="text">1、全年80节课：64节绘本故事＋8节强化＋8节科学阅读。</p>
      <p class="text"></p>
      <p class="text">2、每周2节，固定排期。</p>
      <p class="text">3、4人小班，固定优质欧美外教。</p>
    </div>
    <div class="process">
      <h2>购课流程</h2>
      <div class="process-wrapper">
        <div class="item-wrapper">
          <div class="process-item one">
            <i class="num">1</i>
            <h3>点击发起团购</h3>
            <p>享88折购全年精选课，实付价格¥9011。</p>
            <p>所有参团用户需首先完成试听课（请在“兰思英语”公众号联系助教）。</p>
          </div>
          <div class="process-item two">
            <i class="num">2</i>
            <h3>输入参团另一位用户手机</h3>
            <p>请输入共同参团的用户手机号码。</p>
            <p>请确认该所有参团用户需首先完成试听课。</p>
          </div>
          <div class="process-item three">
            <i class="num">3</i>
            <h3>确认开团（支付）</h3>
            <p>请在点击开团后，完成支付。</p>
          </div>
          <div class="process-item four">
            <i class="num">4</i>
            <h3>发出团购邀请</h3>
            <p>请点击“提醒对方”按钮，根据提示发送邀请给另一位用户开团后，若对方7天内未完成支付，团购将自动关闭。</p>
            <p>如遇问题，请联系官网客服或者助教。</p>
          </div>
          <div class="process-item five">
            <i class="num">5</i>
            <h3>等待对方完成支付</h3>
          </div>
          <div class="process-item six">
            <i class="num">6</i>
            <h3>等待排课</h3>
            <p>支付完成后，助教会与您沟通上课时间。</p>
          </div>
        </div>
      </div>
      <!-- <div class="process-wrapper">
        <div class='nav'>
        </div> -->
        <!-- <div class="item-wrapper">
          <div class="process-item one">点击购课</div>
          <div class="process-item two">输入好友用户手机号</div>
          <div class="process-item three">完成开团支付</div>
          <div class="process-item four">发送团购邀请</div>
          <div class="process-item five">完成参团支付</div>
          <div class="process-item six">创建团购订单</div>
        </div> -->
      <!-- </div> -->
    </div>
    <a href="javascript:" class="main-btn btn_loading com-btn" v-if='ableClick' @click="beginOrder">
      <i v-bind:class='isLoading'></i>发起团购</a>
    <a href="javascript:" class="main-btn com-btn weui-btn_plain-disabled" v-if='!ableClick'
      @click='hint'>
      <i v-bind:class='isLoading'></i>发起团购</a>
    <div class="bottom-tip">*同一用户只支持购买“个人购课”或者“团购购课”。</div>
  </div>
</template>
<script>
import Request from "@/common/request";
import weui from "weui.js";
import { routerReplace } from "@/common/vueCommon.js";
import { isNeedBind } from "@/common/util.js";
export default {
  data: () => {
    return {
      hasTest: "",
      isLoading: "",
      hintMsg: "",
      msg: {
        has: "",
        msg: ""
      },
      nextRouter: "",
      ableClick: true
    };
  },
  methods: {
    beginOrder() {
      let that = this;
      that.isLoading = "weui-loading";
      if (that.msg.has == true) {
        weui.alert(that.msg.msg);
        routerReplace(that, that.nextRouter);
      } else {
        new Request({
          url: "/user/audition/status",
          // mock: require("@/mock/testStatus"),
          data: {
            self: true
          },
          type: "POST"
        }).then(res => {
          that.isLoading = "";
          if (res.code == "0000") {
            routerReplace(that, "TeamInvite", true);
          } else {
            that.isLoading = "";
            weui.alert("您尚未完成试听课，请首先在“兰思英语”公众号联系助教完成试听。");
          }
        });
      }
    },
    hint() {
      if(this.hintMsg){
        weui.alert(this.hintMsg);
      }
    }
  },
  created: function() {
    let that = this;
    that.$loading.show();
    isNeedBind(that, function() {
      new Request({
        url: "/order/query/buyStatus", //购买状态判断
        // mock: require("@/mock/purchaseStatus.js"),
        type: "POST",
        data: {
          skuId: 1000
        }
      }).then(res => {
        let personal_status = res.data.personal || {};
        let group_status = res.data.group || {};
        let groupMobile = group_status.groupMobile;

        if (group_status.groupStatus == 2) {
          // 团购完成
          routerReplace(that, "OrderResult");
        }else if (group_status.groupStatus == 3){
          // 团购已超时
          that.$loading.hide();
          that.hintMsg = '您的好友未在规定时间内完成支付，团购订单现已关闭。助教会联系您沟通退款事宜，退款将在1-7个工作日内完成。';
          weui.alert(that.hintMsg)
          that.ableClick = false;
        }else if (group_status.initiator && group_status.isPay == 0) {
          //发起者未支付
          that.$router.replace({
            path: "TeamInfo",
            query: {
              gId: group_status.groupId,
              groupMobile: groupMobile
            }
          });
        }else if (group_status.initiator && group_status.isPay == 1) {
          //发起者已经支付
          that.$router.replace({
            path: "InviteResult",
            query: {
              gId: group_status.groupId,
              groupMobile: groupMobile
            }
          });
          // that.$loading.hide();
        } else if (!group_status.initiator && group_status.groupStatus == 1) {
          //被邀请未支付
          // routerReplace(that, "TeamInfo");
          that.$router.replace({
            path: "TeamInfo",
            query: {
              gId: group_status.groupId,
              groupMobile: groupMobile
            }
          });
        } else if (!group_status.initiator && group_status.isPay == 1) {
          //被邀请者已支付
          // routerReplace(that, "OrderResult");
          that.$router.replace({
            path: "OrderResult",
            query: {
              gId: group_status.groupId,
              groupMobile: groupMobile
            }
          });
        } else if (personal_status.isPay) {
          that.ableClick = false;
          that.hintMsg = "您已存在“个人购课”订单<br>无法参加“团购购课”。";
          weui.alert(that.hintMsg);
          that.$loading.hide();
        } else if (personal_status.hasOrder) {
          // 有未支付的团购订单
          that.$loading.hide();
        } else {
          that.$loading.hide();
        }

        // that.purCharseStatus = res.code
        // console.log(res.msg);
        // if (res.data.type == 0) {
        //   console.log("test");
        //   that.$loading.hide();
        // } else {
        //   if (res.data.type == 1 && res.data.isPay == 0) {
        //     //有未支付的个人订单
        //     // weui.alert(
        //     //   "您已存在已完成个人订单！",
        //     //   routerReplace(that, "PerOrder")
        //     // );
        //     that.$loading.hide();
        //   } else if (res.data.type == 1 && res.data.isPay == 1) {
        //     //个人订单已完成
        //     that.$loading.hide();
        //     that.msg.has = true;
        //     that.msg.msg = "您已存在已完成个人订单！";
        //     that.nextRouter = "OrderResult";
        //     that.ableClick = false;
        //   } else if (res.data.type == 2) {
        //     //团购订单
        //     if (res.data.groupStatus == 2) {
        //       that.ableClick = false;
        //       weui.alert("您已存在已完成的团购订单！");
        //       // routerReplace(that, "OrderResult"); //团购已完成
        //     } else if (res.data.initiator && res.data.isPay == 0) {
        //       //发起者未支付
        //       routerReplace(that, "TeamInfo");
        //     } else if (res.data.initiator && res.data.isPay == 1) {
        //       //发起者已经支付
        //       routerReplace(that, "InviteResult");
        //     } else if (!res.data.initiator && res.data.isPay == 0) {
        //       //被邀请未支付
        //       routerReplace(that, "TeamInfo");
        //     } else if (!res.data.initiator && res.data.isPay == 1) {
        //       //被邀请者已支付
        //       routerReplace(that, "OrderResult");
        //     }
        //   }
        // }
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.teamOrder-wrapper {
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  overflow: hidden;
  color: white;
  padding-bottom: 50px;
  a {
    width: 650px;
  }
  .sale-pannel {
    .text {
      text-align: left;
      margin: 17px auto;
      padding: 0;
    }
  }
  .main-btn {
    margin: 80px auto 20px;
    font-size: 36px;
  }
  .bottom-tip{
    font-size: 20px;
    margin: 10px auto;
    color:#7b7b7b;
  }
}
</style>
