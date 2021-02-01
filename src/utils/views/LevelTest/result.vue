<template>
  <div class="result-wrap">
    <p class="result-title"><span>{{nickname}}</span><img src='~@/assets/img/font-pic2.png'/></p>
    <img class="level" :src="img" alt="">
    <div class="result-content">
        <div class="bottom"></div>
        <div class="top">
          <!-- <p>太棒了！你已经具备了相当的英语词汇量，可以听懂很多日常的对话了。现在去参加魔法师课程吧！在这里你将学习到更多的高频词汇，更复杂的语法知识。挑战一下自己，看是否能将这些语言能力应用到你的日常学习和交流中。</p>   -->
          <p>{{text}}</p>
        </div>   
    </div>
    <div class="result-btn">
      <img class="golive" @click='toAppHome()' src="~@/assets/img/golive.jpg" alt="">
      <img class="share" @click='toAppShare()' src="~@/assets/img/share.jpg" alt="">
    </div>
  </div>
</template>
<script>
import Request from "@/common/request.js";
import AppHandle from "@/common/appHandle.js";
import Events from "@/common/events.js";
import Tip from "@/components/tip/index.js";
// import weui from "weui.js";
export default {
  name: "result",
  components: {},
  data: () => {
    return {
      token: "",
      text: "",
      uuid: "",
      nickname: "",
      img: "",
      res: {}
    };
  },
  methods: {
    result() {
      let that = this;
      Request({
        headers: {
          // token: that.token
        },
        url: "/liveapi/assessment/get/result",
        type: "post",
        data: {
          assessmentUuid: that.uuid
        }
      }).then(res => {
        if (res.code == "0000") {
          console.log(44444)
          console.log(res.data);
          that.res = res.data;
          // that.level = res.data.level;
          that.text = res.data.text;
          that.nickname = res.data.nickname || '你的';
          if (res.data.level == "1") {
            that.img = require("@/assets/img/ziran.jpg");
          } else if (res.data.level == "2") {
            that.img = require("@/assets/img/jinjie.jpg");
          } else if (res.data.level == "3") {
            that.img = require("@/assets/img/yubeiji.jpg");
          } else {
          }
        }
      });
    },
    toAppHome() {
      AppHandle().toHome();
    },
    toAppShare() {
      let shareUrl = location.href.split("#")[0] + "#/LevelShare";
      AppHandle().share(shareUrl);
    }
  },
  created: function() {
    let that = this;
    let uuid = window.L.util.getUrlParam("uuid");
    that.uuid = uuid;
    that.result();
    // that.token = 'tk_66500ebe125645279ee2d56018a2b8a4';
    // that.result();
  },
  mounted: function() {
    this.$loading.hide();
  }
};
</script>
<style scoped lang="less">
@import "~@/assets/css/common/index.less";
/* @import "~@/assets/css/common/weui.css"; */
html,
body {
  overflow: hidden;
}
.result-wrap {
  width: 100%;
  height: 100%;
  min-height: 1110px;
  box-sizing: border-box;
  overflow: auto;
  background: linear-gradient(#7cc2fa, #a0effb, #7cc2fa);
}
.result-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  // margin-top: 60px;
  margin-top:116px;
  // font-size: 54px;
  font-size: 58px;
  color: #fff;
  text-align: center;
  text-shadow: 3px 1px 5px #989595;
  white-space: nowrap;
  span {
    max-width: 530px;
    display: inline-block;
    // line-height: 74px;
    line-height: 68px;
    vertical-align: bottom;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  img {
    vertical-align: middle;
    margin-left: 4px;
    // width: 200px;
    // height: 42px;
    width: 348px;
    height: 68px;
  }
}
.level {
  // min-width: 500px;
  // min-height: 150px;
  width: 500px;
  height: 150px;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: 50px;
}
div.result-content {
  width: 600px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}
div.top {
  width: 600px;
  height: 500px;
  background: white;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  box-shadow: 0px 0px 1px grey;
}
.top p {
  width: 520px;
  height: 330px;
  margin: auto;
  margin-top: 85px;
  line-height: 50px;
  font-size: 30px;
  text-indent: 2em;
  color: #033e6e;
}
div.bottom {
  width: 600px;
  height: 500px;
  background: #ffde6b;
  position: absolute;
  top: 0px;
  left: 0px;
  transform: rotate(-3deg);
  box-shadow: 0px 0px 1px grey;
}
.result-btn {
  width: 100%;
  height: 80px;
  padding-top: 150px;
  padding-bottom: 60px;
}
.result-btn img {
  width: 265px;
  height: 80px;
}
.result-btn .golive {
  margin-left: 90px;
}
.result-btn .share {
  margin-left: 40px;
}
</style>

