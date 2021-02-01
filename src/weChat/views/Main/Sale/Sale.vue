<template>
  <div class="saleInfo-wrapper">
    <div class="topInfo">
    </div>
    <div class="sale-pannel sale-per">
      <div class="title-bar">精选课 双人购88折</div>
      <p class="text">2人成团，88折购全年精选课程～</p>
      <p class="price">
        <span class="now">￥9011</span><span class="del">￥10240</span>
      </p>
      <p class="text">80课时／40周</p>
      <a href="javascript:" class="main-btn details" @click='goTeam'>查看详情</a>
    </div>
    <div class="sale-pannel sale-team">
      <div class="title-bar">精选课个人购</div>
      <p class="text">
        个人购课，享全年精选课程～
      </p>
      <p class="price">
        <span class="now">￥10240</span>
        <!-- <span class="del">￥10240</span> -->
      </p>
      <p class="text">
        80课时／40周
      </p>
      <a href="javascript:" class="main-btn details" @click='goPer'>查看详情</a>
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
      routerReplace(that, "PerOrder", true);
    },
    goTeam() {
      this.$loading.show();
      let that = this;
      routerReplace(that, "TeamOrder", true);
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
