<template>
  <div class="sharepage-wrapper">
    <!--
    <router-link :to="{path: '/Sale', query: {gId: ''}}" class="back-link">&lt; 返回活动首页</router-link>
    -->
    <a :href="`/lexis-activity/weChat/index.html?r=${parseInt((Math.random()*100))}#/Sale`" class="back-link">&lt; 返回活动首页</a>
    <div class="top-info">
      <h3 class="title">{{initiatorWechatNickname || '您的好友'}}正在邀请<span v-if="groupMobile">({{groupMobile}})</span><span v-else>好友</span>一起团购兰思英语课程</h3>
      <h3 class="desc">提示：参团者需在 {{expireTime}} 前完成支付才可以完成团购订单。</h3>
    </div>
    <div class="sale-pannel">
      <h2 class="title-bar">课程明细</h2>
      <div class="wrapper">
        <h2 class="title-bar">双人团购</h2>
        <p class="price">
          <span class="now">￥9011</span>
          <span class="del">￥10240</span>
        </p>
      </div>
      <div class="text teamDetails">
        <p>1、全年80节课：64节绘本故事＋8节强化＋8节科学阅读</p>
        <p>2、每周2节，固定排期</p>
        <p>3、4人小班，固定优质欧美外教</p>
      </div>
      <a href="javascript:" class="main-btn btn_loading" v-bind:class="groupStatus == 3?weui-btn_plain-disabled:''" @click="pay">
        <i v-bind:class='isLoading'></i>支付¥9011
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
      ableClick: true,
      isInviter: "",
      initiatorMobile: "",
      initiatorWechatNickname: "",
      groupId: "",
      groupMobile: "",
      isLoading: "",
      expireTime: "",
      groupStatus: ""
    };
  },
  methods: {
    pay() {
      let that = this;
      if(!that.ableClick){
          return false;
      }
      if(that.isInviter){
          weui.alert("此订单您已完成支付，无需再次支付～");
          return;
      }
      if (that.groupStatus !== 3) {
        that.isLoading = "weui-loading";
        let mobile = that.$route.query.groupMobile || "";
        let isGroup = this.isInviter;
        isNeedBind(that, function() {
          wxPay(that, {
            mobile: mobile,
            isGroup: true,
            groupId: that.groupId,
            alertFunc: that.showAlert
          });
        });
      } else {
        that.showAlert("该团购订单已过期！")
      }
    },
    showAlert(msg) {
        weui.alert(msg, {
            buttons: [
                {
                    label: '关闭',
                    type: 'default'
                },    
                {
                    label: '进入活动首页',
                    type: 'primary',
                    onClick: function(){ 
                        location.href = `/lexis-activity/weChat/index.html?r=${parseInt((Math.random()*100))}#/Sale`;
                    }
                }
            ]
        });
    },
    initShow() {
      let that = this;
      let url = window.location.href.toString();
      let groupId = window.L.util.getUrlParam("gId");
      that.groupMobile = window.L.util.getUrlParam("gM");

      if (!groupId) {
        that.$loading.hide();
        that.$router.replace({ path: "Sale" });
        return ;
      }

      Request({
        url: "/order/query/group/share",
        // mock: require("@/mock/teamInfo"),
        data: {
          groupId: groupId
        },
        type: "POST"
      }).then(res => {
        // alert(res.msg || "");
        if(res.code == '0000'){
            that.isInviter = res.data.initiator;
            that.initiatorMobile = res.data.initiatorMobile;
            that.initiatorWechatNickname = res.data.initiatorWechatNickname || "";
            that.groupId = res.data.groupId;
            that.expireTime = res.data.expireTime;
            that.groupStatus = res.data.groupStatus;
            if (res.data.groupStatus == 3) {
                that.showAlert("该团购订单已过期！")
                that.ableClick = false;
            }
        }else{
            that.ableClick = false;
            that.showAlert(res.msg || "系统错误")
            
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

.sharepage-wrapper {
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  overflow: hidden;
  color: #7b7b7b;
  .top-info {
    margin-top: 60px;
    padding: 60px;
    .title {
      font-size: 42px;
      text-align: left;
      word-break: break-all;
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
  .back-link{
    color: #fff;
    display: inline-block;
    text-align: left;
    border-bottom: 1px solid #fff;
    position: absolute;
    left: 60px;
    top: 20px;
    font-size: 26px;
    font-weight: 600;
  }
}
</style>
