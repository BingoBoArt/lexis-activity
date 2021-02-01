<template>
  <div class="saleInfo-wrapper">
    <div class="topInfo">
    </div>
    <div class="sale-pannel sale-per">
      <div class="title-bar">夏季畅学季 第一学年5.5折开班</div>
      <p class="text">精选第一学年课程，享夏季5.5折优惠～</p>
      <p class="price">
        <span class="now">￥3920</span><span class="del">￥7128</span>
      </p>
      <p class="text">72课时／36周</p>
      <a href="javascript:" class="main-btn details" @click='goPer'>查看详情</a>
    </div>
    <div class="sale-pannel sale-team">
      <div class="title-bar">夏季畅学季 2学年连报享5折</div>
      <p class="text">
        精选第一学年、第二学年课程
      </p>
      <p class="text">
        两个学年课程连报，享5折优惠～
      </p>
      <p class="price">
        <span class="now">￥7128</span>
        <span class="del">￥14256</span>
      </p>
      <p class="text">
        144课时／72周
      </p>
      <a href="javascript:" class="main-btn details" @click='goTeam'>查看详情</a>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request.js";
import setShare from "@/common/setShare.js";
import { isNeedBind } from "@/common/util.js";
import { routerReplace } from "@/common/vueCommon.js";
let stepComponet = {
  props: ["number"],
  template: `<div class="step"><span style="margin-left:5px;">Case</span>{{number}}</div>`
};
export default {
  name: "SalePur",
  components: {
    step: stepComponet
  },
  data: () => {
    return {
      purCharseStatus: ""
    };
  },
  methods: {
    goPer() {
      this.$loading.show();
      let that = this;
      routerReplace(that, "OneTerm", true);
    },
    goTeam() {
      this.$loading.show();
      let that = this;
      routerReplace(that, "TwoTerms", true);
    }
  },
  created: function() {},
  mounted: function() {}
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.saleInfo-wrapper {
  overflow-x: hidden;
  text-align: center;
  width: 100%;
  min-height: 100%;
  padding-bottom: 80px;
  background: @color2;
  // height: 100%;
  .bold {
    font-weight: 600;
    font-size: 30px;
  }
  .step {
    margin: 0 auto;
    width: 400px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: @fontColor; // border: 3px solid @color;
    // border-radius: 50px;
    font-size: 50px; // background: #507ea4;
    box-shadow: 5px red;
    margin-top: 200px;
  }

  .sale-pannel {
    .text {
      padding: 0 20px 0 20px;
      text-align: center;
    }
  }
  .topInfo {
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: url("../../../assets/images/resource/ban_chunjie.jpg") no-repeat;
    background-size: contain;
  }
}
</style>

