<template>
  <div class="orderResult-wrapper">
    <div class="top-info">
      <div class="title">您已成功购买该套课程!</div>
      <p class="desc">温馨提示：兰思英语官方助教会与您取得联系，沟通上课时间～</p>
    </div>
    <div class="deviceInfo">
      <p class="strong-tip top">设备须知</p>
      <div>
        <div style="display:inline-block" class="mar">
          <img src="../../../assets/images/ipad.png" alt="">
          <p class="ipad">仅支持iPad设备</p>
        </div>
        <div style="display:inline-block">
          <img src="../../../assets/images/wifi.png" alt="" class="im2">
          <p>稳定的WIFI</p>
        </div>
      </div>
      <p class="strong-tip top">上课须知</p>
      <div class="process">
        <div v-for="(item,index) in processes" v-bind:key='index'>
          <div class="step" v-bind:key="index">{{item}}</div>
          <img src="../../../assets/images/arrow-down.png" alt="" class="arrow">
        </div>
        <div class="step">Step6. 按时上课</div>
      </div>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request";
export default {
  data: () => {
    return {
      teamerMobile: "",
      processes: [
        "Step1.  关注微信公众号",
        "Step2.  分配专属助教",
        "Step3.  完成外教试听课",
        "Step4.  匹配外教&安排精英小班",
        "Step5.  确认排课"
      ]
    };
  },
  created: function() {
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.orderResult-wrapper {
  .top-info {
    text-align: center;
    width: 100%;
    background: @color2;
    overflow: hidden;
    color: #7b7b7b;
    padding: 40px 30px;
    box-sizing: border-box;
    .title {
      margin: 40px auto;
      text-align: left;
      font-size: 40px;
      word-break: break-all;
      color: #7b7b7b;
    }
    .desc {
      font-size: 28px;
      color: #7b7b7b;
      text-align: left;
      border-radius: 17px;
      padding: 10px 15px;
      margin-top: 20px;
    }
  }
  p {
    font-size: 25px;
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
  .strong-tip {
    font-size: 40px;
    font-weight: 600;
  }
  .process {
    text-align: center;
  }
}
</style>
