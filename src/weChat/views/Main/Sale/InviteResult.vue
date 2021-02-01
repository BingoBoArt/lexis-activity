<template>
  <div class="inviteResult-wrapper" @click='closeShareModal'>
    <div class="top-info">
      <h3 class="title" v-if='isInviter'>您已成功邀请好友<span v-if="inviteMobile">手机号({{inviteMobile | encryption}})</span>与您一起团购兰思英语课程</h3>
      <h3 class="desc">提示：您的好友需在{{expireTime}}前完成支付才可以完成团购订单。</h3>
    </div>
    <div class="sale-pannel">
      <h2 class="title-bar">双人团购课程</h2>
      <div class="text teamDetails">
        <p>1、全年80节课：64节绘本故事＋8节强化＋8节科学阅读。</p>
        <p>2、每周2节，固定排期。</p>
        <p>3、4人小班，固定优质欧美外教。</p>
      </div>
    </div>
    <a href="javascript:" class="main-btn com-btn" @click.stop='shareGuide' v-if="isInviter">提醒对方</a>
    <div class="hint-mask" v-if="setShare">
      <div class="hint"></div>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request";
import setShare from "@/common/setShare.js";
import Api from "@/common/api.js";
export default {
  data: () => {
    return {
      isInviter: true,
      setShare: false,
      initiatorWechatNickname: "",
      inviteMobile: "",
      expireTime: ""
    };
  },
  methods: {
    shareGuide() {
      this.setShare = true;
    },
    closeShareModal() {
      console.log("closeModal");
      this.setShare = false;
    }
  },
  created: function() {
    let that = this;
    
    let tradeNo = window.L.util.getLocalStorage("tradeNo") || "";
    that.inviteMobile = that.$route.query.groupMobile || window.L.util.getLocalStorage("invite-mobile") || "";
    Request({
      url: "/order/query/info/traderesult",
      // mock: require("@/mock/purchaseInfo"),
      data: {
        tradeNo: tradeNo
      },
      type: "POST"
    }).then(res => {
      console.log(res);
      if (res.data && res.data.groupId) {
        let groupId = res.data.groupId;
        new Request({
          url: "/order/query/group/share",
          // mock: require("@/mock/teamInfo"),
          data: {
            groupId: groupId
          },
          type: "POST"
        }).then(res => {
          console.log(res);
          that.isInviter = res.data.initiator;
          that.initiatorMobile = res.data.initiatorMobile;
          that.initiatorWechatNickname = res.data.initiatorWechatNickname;
          that.expireTime = res.data.expireTime;
        }).always(() => {
          that.$loading.hide();
        })
        // alert(groupId);
        let _gM = that.inviteMobile.replace(/(\w{3})\w*(\w{4})/, "$1****$2")
        let inviteUrl = `${location.protocol}//${location.hostname}/lexis-activity/weChat/index.html?gId=${groupId}&gM=${_gM}#/SharePage`; //分享购买信息页

        window.L.util.setLocalStorage("inviteUrl", inviteUrl);
        setShare({
          shareUrl: inviteUrl,
          wxTitle: `您的朋友${that.initiatorWechatNickname}喊你去团课啦～`,
          wxDesc: "兰思英语Level-1课程团购火热进行中，快来抢课吧～"
        });
      }
    });

    // alert(href)
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.inviteResult-wrapper {
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  overflow: hidden;
  color: white;

  .hint-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    .hint {
      width: 500px;
      height: 390px;
      background: url("../../../assets/images/resource/shareGuide.png")
        no-repeat;
      background-size: contain;
      float: right;
      margin: 30px;
    }
  }
  .top-info {
    padding: 60px;
    .title {
      font-size: 35px;
      text-align: left;
      word-break: break-all;
      color: #7b7b7b;
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
  }
  .sale-pannel {
    .text {
      font-size: 24px;
      text-align: left;
      margin: 40px auto;
      padding: 0;
    }
  }
  .main-btn {
    margin: 120px auto 60px;
  }
}
</style>
