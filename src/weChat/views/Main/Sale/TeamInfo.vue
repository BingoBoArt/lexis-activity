<template>
  <div class="teamInfo-wrapper">
    <div class="top-info">
      <h3 class="title" v-if='!isInviter'>{{initiatorWechatNickname || '您的好友'}}正在邀请您一起团购兰思英语课程</h3>
      <h3 class="title" v-if='isInviter'>
        您正在邀请您的好友<span v-if="inviteMobile">手机号({{inviteMobile | encryption}})</span>一起团购兰思英语课程</h3>
      <h3 class="desc" v-if='!isInviter'>提示：您需在 {{expireTime}} 前完成支付才可以完成团购订单。</h3>
    </div>
    <div class="sale-pannel">
      <h2 class="title-bar">课程明细</h2>
      <div class="wrapper" v-if='!isInviter'>
        <h2 class="title-bar">双人团购</h2>
        <p class="price">
          <span class="now">￥9011</span>
          <span class="del">￥10240</span>
        </p>
      </div>
      <div class="text teamDetails">
        <p>1、全年80节课：64节绘本故事＋8节强化＋8节科学阅读。</p>
        <p>2、每周2节，固定排期。</p>
        <p>3、4人小班，固定优质欧美外教。</p>
      </div>
      <a href="javascript:" class="main-btn btn_loading" v-bind:class="groupStatus == 3?weui-btn_plain-disabled:''" @click="pay">
        <i v-bind:class='isLoading'></i>支付 ¥9011
      </a>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request";
import { wxPay, isNeedBind } from "@/common/util";
import weui from "weui.js";
export default {
  data: () => {
    return {
      isInviter: "",
      initiatorMobile: "",
      initiatorWechatNickname: "",
      inviteMobile: "",
      groupId: "",
      isLoading: "",
      expireTime: "",
      groupStatus: ""
    };
  },
  methods: {
    pay() {
      let that = this;
      if (that.groupStatus !== 3) {
        that.isLoading = "weui-loading";
        let mobile = that.$route.query.groupMobile || "";
        let isGroup = this.isInviter;
        isNeedBind(that, function() {
          wxPay(that, {
            mobile: mobile,
            isGroup: true,
            groupId: that.groupId
          });
        });
        console.log("start pay");
      } else {
        weui.alert("该团购订单已过期！");
      }
    },
    initShow() {
      let that = this;
      let url = window.location.href.toString();
      let groupIdUrl = window.L.util.getUrlParam("gId") || that.$route.query.gId;
      let groupId = groupIdUrl;
      /*
      if (!groupId) {
        that.$loading.hide();
        that.$router.replace({ path: "Sale" });
        return ;
      }
      */
      let inviteMobile = that.$route.query.groupMobile || localStorage.getItem("invite-mobile") || "";
      that.inviteMobile = inviteMobile;
      Request({
        url: "/order/query/group/share",
        // mock: require("@/mock/teamInfo"),
        data: {
          groupId: groupId
        },
        type: "POST"
      }).then(res => {
        // alert(res.msg || "");
        that.isInviter = res.data.initiator;
        that.initiatorMobile = res.data.initiatorMobile;
        that.initiatorWechatNickname = res.data.initiatorWechatNickname || "";
        that.groupId = res.data.groupId;
        that.expireTime = res.data.expireTime;
        that.groupStatus = res.data.groupStatus;
        if (res.data.groupStatus == 3) {
          weui.alert("该团购订单已过期！");
        }

        that.$loading.hide();
      });
      //处理静默授权来回跳转问题
      /*
        let slientKey = window.L.util.getSessionStorage("slientKey");
        if (slientKey == "true") {
          wxPay(that, { mobile: mobile, isGroup: true, groupId: that.groupId });
          window.L.util.removeSessionStorage("slientKey");
        }
        */
    }
  },
  created: function() {
    let that = this;
    that.$loading.show();
    isNeedBind(
      that,
      function() {
        that.initShow();
      },
      {
        checkBind: false
      }
    );
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";

.teamInfo-wrapper {
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  overflow: hidden;
  color: #7b7b7b;
  .top-info {
    padding: 60px;
    .title {
      font-size: 42px;
      text-align: left;
      word-break: break-all;
      color: #7b7b7b;
    }
  }
  .desc {
    font-size: 28px;
    color: #7b7b7b;
    text-align: left;
    background: #fb82578f;
    border-radius: 17px;
    padding: 10px 15px;
    margin-top: 20px;
  }
  .sale-pannel {
    .text {
      text-align: left;
      margin: 40px auto;
    }
  }
}
</style>
