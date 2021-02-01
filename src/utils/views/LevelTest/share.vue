<template>
  <div class="share-wrap">
      <p class="share-title"><span>{{res.nickname}}</span><img src='~@/assets/img/font-pic1.png'/></p>
      <img class="level" :src="img" alt="">
      <div class="share-content">
          <div class="bottom"></div>
          <div class="top">
            <p>{{res.text}}</p>
          </div>   
      </div>
      <div class="share-bottom">
          <img class="erwei" src="~@/assets/img/erwei.jpg" alt="">
          <img class="pro-dec" src="~@/assets/img/pro-dev.png" alt="">
      </div>
      <div class="save-btn">
        <button class="save" @click="share">生成海报分享给好友</button>
      </div>
      
      <ShareImg class="Image" :show="show" :res="res" @close="onClose"></ShareImg>
  </div>
</template>
<script>
import Request from "@/common/request.js";
import Tip from "@/components/tip/index.js";
import ShareImg from "@/views/LevelTest/shareimage.vue";

export default {
  name: "Share",
  data: () => {
    return {
      show: false,
      res: {},
      uuid: "",
      img: "",
      level_config: {
        1: {
          img: require("@/assets/img/ziran.jpg")
        },
        2: {
          img: require("@/assets/img/jinjie.jpg")
        },
        3: {
          // img: require("@/assets/img/xiaowushi.jpg")
          img: require("@/assets/img/yubeiji.jpg")
        }
      }
    };
  },
  components: {
    ShareImg: ShareImg
  },
  methods: {
    onClose() {
      this.show = false;
    },
    loadshare() {
      let that = this;
      Request({
        headers: {
          // token: that.token
        },
        url: "/liveapi/assessment/get/result",
        type: "post",
        data: {
          assessmentUuid: that.uuid
          // assessmentUuid: 'd4837110ea384bec9e3113d97183328d'
        }
      }).then(res => {
        if (res.code == "0000") {
          console.log(555555)
          // console.log(res)
          console.log(res.data);
          that.res = res.data;
          that.res.nickname = res.data.nickname || '我';
          that.img = that.level_config[res.data.level].img;
        }
      });
    },
    share() {
      let that = this;
      that.show = true;
      this.$emit("loading");
    }
  },
  created: function() {
    let that = this;
    let uuid = window.L.util.getUrlParam("uuid");
    that.uuid = uuid;
    that.loadshare();
    // that.token = 'tk_66500ebe125645279ee2d56018a2b8a4';
    // that.loadshare();
  },
  mounted: function() {
    this.$loading.hide();
  }
};
</script>
<style scoped lang="less">
/*其中fontName替换为你的字体名称*/
h1 {
  font-family: "cn_en";
}
@import "~@/assets/css/common/index.less";
html,
body {
  overflow: hidden;
}
.share-wrap {
  width: 100%;
  min-height: 100%;
  background: #b4f4fa url("~@/assets/img/share_bg.jpg") no-repeat;
  background-size: 100% auto;
  overflow: auto;
  background-color: #b4f4fa;
}
.Image {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-height: 100%;
  z-index: 1088;
  /* overflow: hidden; */
}
.share-title {
  padding-top: 264px;
  font-size: 44px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  height: 70px;
  // margin-bottom: 38px;
  white-space: nowrap;
  span {
    display: inline-block;
    max-width: 550px;
    // line-height: 60px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    // top: -4px;
  }
  img {
    vertical-align: middle;
    margin-left: 4px;
    width: 172px;
    height: 36px;
  }
}
.level {
  // width: 204px;
  // height: 76px;
  // width: 412px;
  height: 120px;
  display: block;
  // margin: 20px auto 30px;
  margin: 20px auto 30px;
}
div.share-content {
  width: 580px;
  height: 310px;
  position: relative;
  margin: 0 auto 90px;
  .top {
    width: 580px;
    height: 310px;
    background: white;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    box-shadow: 0px 0px 1px grey;
    p {
      width: 520px;
      height: 240px;
      margin: auto;
      padding-top: 20px;
      padding-bottom: 20px;
      line-height: 40px;
      font-size: 26px;
      text-indent: 2em;
      color: #000;
    }
  }
  .bottom {
    width: 580px;
    height: 310px;
    background: #ffde6b;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: rotate(-3deg);
    box-shadow: 0px 0px 1px grey;
  }
}
.share-bottom {
  width: 100%;
  height: 320px;
  padding-bottom: 90px;
  margin: 0 auto;
  .pro-dec {
    width: 324px;
    margin-left: 20px;
  }
  .erwei {
    width: 220px;
    height: 300px;
    margin-left: 75px;
  }
}
.save-btn {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 14px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 3;
  .save {
    display: block;
    width: 580px;
    height: 90px;
    margin: auto;
    line-height: 90px;
    border-radius: 46.5px;
    font-size: 32px;
    color: white;
    border: none;
    background: #00a0e9;
  }
}
</style>

