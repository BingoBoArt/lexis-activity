<template>
  <div class='teamInvite-wrapper'>
    <div class="sale-pannel">
      <div class="title-bar">邀请好友</div>
      <h2>请输入您好友的手机号码：</h2>
      <p>温馨提示：请保证该用户注册账号已经完成试听。</p>
      <input type="text" placeholder="请输入手机号" v-model="mobile" class="weui-input in1">
      <a href="javascript:" class="main-btn com-btn btn_loading" @click='beginInvite'>
        <i v-bind:class='isLoading'></i>确认开团
      </a>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request";
export default {
  data: () => {
    return {
      hasTest: "",
      mobile: "",
      isLoading: ""
    };
  },
  methods: {
    beginInvite() {
      let that = this;
      that.$loading.hide();
      if (!/^\d{3,11}$/.test(that.mobile)) {
        weui.alert("请正确填写好友的手机号码。");
        return false;
      }
      that.isLoading = "weui-loading";
      new Request({
        url: "/user/audition/status",
        // mock: require("@/mock/testStatus"),
        data: {
          mobile: that.mobile,
          self: false
        },
        type: "POST"
      }).then(res => {
        console.log(res.code);
        that.isLoading = "";
        if (res.code == "0000") {
          localStorage.setItem("invite-mobile", that.mobile);
          that.$router.replace({
            path: "TeamInfo",
            query: {
              groupMobile: that.mobile
            }
          });
        } else {
          weui.alert(res.msg || "系统错误");
        }
      });
    }
  },
  created: function() {}
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.teamInvite-wrapper {
  text-align: center;
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: @color2;
  overflow: hidden;
  color: white;
  .sale-pannel {
    margin-top: 300px;
  }
  a {
    margin-top: 30px;
    width: 590px;
  }
  h2 {
    margin-top: 60px;
  }
  .in1 {
    width: 600px;
    height: 70px;
    border: 1px solid rgb(218, 167, 167);
    border-radius: 10px;
    position: relative;
    margin: 20px auto 0;
    font-size: @rootFontSize;
    color:#7b7b7b;
    text-indent: 10px;
    div {
      line-height: 82px;
    }
  }
}
</style>
