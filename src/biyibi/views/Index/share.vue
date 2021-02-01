<template>
  <div class="wrapper" v-loading="loading">
    <div class="wrapper-inner">
      <div class="content">
        <div class="content-inner">
          <p class="nickname">{{recoreInfo.nickname || ""}}</p>
          <div class="headpic-wrapper">
            <img v-show="recoreInfo.imgUrl" class="headpic" :src="recoreInfo.imgUrl">
            <img v-if="recoreInfo.rank && recoreInfo.rank >= 1 && recoreInfo.rank <= 3" class="rank-circle" :src="require(`@/assets/img/headpic${recoreInfo.rank}.png`)">
            <div v-else class="border-mask"></div>
          </div>
          <div class="score-wrapper">
            <p class="score">{{(recoreInfo.score || recoreInfo.score == 0) ? recoreInfo.score : '--'}}<span>分</span></p>
          </div>
        </div>
      </div>
      <img class="share-text" src="~@/assets/img/share/text.png">

      <div class="qrcode-wrapper">
        <p class="text">扫码下载免费体验</p>
        <img class="pic" src="~@/assets/img/share/qrcode.png">
      </div>
      <img class="top-bg-img" src="~@/assets/img/share/top-bg.png">
      <img class="bottom-bg-img" src="~@/assets/img/share/bottom-bg.png">
    </div>
    <div class="save-btn-wrapper">
      <lemon-button class="save-btn" @click="shareHandle">{{isApp ? '分享成绩' : '生成海报分享给好友'}}</lemon-button>
    </div>
    <ShareImg class="Image" :show="shareImgShow" :res="recoreInfo" @close="onClose"></ShareImg>
  </div>
</template>
<script>
import Request from "@base/common/request.js";
import AppHandle from "@base/common/appHandle.js";
import LemonUtils from 'lemon-utils';
import Share from '@base/components/share/index.js'
import UserInfoCom from '@base/components/userInfo/index.js'
import btnBasic from "@/components/btn-basic/index.vue";
import ShareImg from "./shareimage.vue";

export default {
  name: "result",
  components: {
    btnBasic,
    ShareImg
  },
  data: () => {
    return {
      loading: true,
      uuid: "",
      shareImgShow: false,
      userInfo: {},
      isApp: AppHandle.isApp,
      recoreInfo: {
        imgUrl: 'http://file.lexislive.com.cn/resource/201901/9b35e2d7-8794-4575-8337-73bf49795013.png'
      }
    };
  },
  methods: {
    onClose() {
      this.shareImgShow = false;
    },
    shareHandle() { 
      if(this.isApp){
        let shareUrl = location.href.split("#")[0] + "#/Share?uuid=" + this.recoreInfo.uuid;
        Share.do({
          title: "我正在英语天天见学英语！",
          desc: "北美外教天天直播！快来跟我一起学吧！",
          imgUrl: 'http://file.lexislive.com.cn/resource/201901/76440a00-5c94-41d0-b4ed-ed311009593a.png',
          link: shareUrl
        })
      }else{
        this.shareImgShow = true;
      }
    },
    getRecord() {
      let that = this;
      let params = {};
      if(that.userInfo && that.userInfo.token){
        params.token = that.userInfo.token
      }
      if(that.uuid){
        params.uuid = that.uuid
      }
      Request({
        url: "/exercise/share/record",
        // mock: require("@/mock/record.js"),
        type: "post",
        data: params
      }).then(res => {
        if (res.code == "0000") {
          that.recoreInfo = res.data || {}
        }
      }).always(() => {
        that.loading = false;
      })
    }
  },
  created: async function() {
    let that = this;
    let uuid = LemonUtils.getUrlParam("uuid");
    let userInfo = await UserInfoCom.getUserInfo(that, {forceWechatLogin: false});
    // let userInfo = {};
    that.uuid = uuid;
    that.userInfo = userInfo;
    that.getRecord();
  },
  mounted: function() {
    if(!this.isApp){
      // 分享到微信打开页面
      document.title = "英语天天见--外教直播天天见"
    }
  }
};
</script>
<style scoped lang="less">
html,
body {
  overflow: hidden;
}
.wrapper {
  width: 100%;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .wrapper-inner{
    width: 100%;
    height: 100%;
    min-height: 1160px;
    background: url(~@/assets/img/bg.jpg) no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  .content{
    width: 712px;
    height: 726px;
    background: url(~@/assets/img/light.png) no-repeat;
    background-size: cover;
    margin: 30px auto 0;
    box-sizing: border-box;
    overflow: hidden;
    .content-inner{
      margin-top: 120px;
      position: relative;
      z-index: 1;
    }
  }
  .nickname{
    height: 60px;
    line-height: 60px;
    margin-bottom: 10px;
    color: #186288;
    font-size: 52px;
    /* -webkit-text-stroke: 4px #c5271e; */
    font-weight: bold;
    // text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e;
    // -webkit-text-stroke: 1px white; /*no*/
    // letter-spacing: 4px;
    text-align: center;
  }
  .headpic-wrapper{
    width: 290px;
    height: 290px;
    position: relative;
    margin: 0 auto;
    .rank-circle{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .border-mask{
      border: 5px solid white;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 290px;
      box-sizing: border-box;
      /* box-shadow: 0 0 5px #000 inset; */
    }
    .headpic{
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 290px;
    }
  }

  .score-wrapper{
    background: url(~@/assets/img/bg-score.png) no-repeat top center;
    background-size: 403px 140px;
    text-align: center;
    margin: -30px auto 0;
    height: 140px;
    position: relative;
    .score{
      height: 72px;
      line-height: 72px;
      color: #fff;
      font-size: 56px;
      /* -webkit-text-stroke: 4px #c5271e; */
      font-weight: bold;
      // text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e;
      // -webkit-text-stroke: 1px #c5271e; /*no*/
      // letter-spacing: 4px;
      span{
        font-size: 36px;
      }
    }
  }
  .share-text{
    width: 520px;
    height: 93px;
    margin: -130px auto 0;
    display: block;
    position: relative;
    z-index: 1;
  }
  .result-btns{
    width: 650px;
    margin: 70px auto 0;
    .result-btn{
      float: left;
      margin-bottom: 20px;
    }
    .btn-view{
      width: 304px;
      height: 98px;
      img{
        width: 166px;
        height: 39px;
      }
    }
    .btn-again{
      padding: 0;
      width: 304px;
      height: 98px;
      margin-left: 42px;
      img{
        width: 251px;
        height: 39px;
      }
    }
    .btn-share{
      width: 650px;
      height: 98px;
      img{
        width: 166px;
        height: 39px;
      }
    }
  }
}
.save-btn-wrapper{
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 26px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 3;
  .save-btn {
    display: block;
    width: 689px;
    height: 93px;
    margin: auto;
    line-height: 93px;
    border-radius: 50px;
    font-size: 40px;
    color: white;
    border: none;
    background: #4fb7f5;
  }
}

.top-bg-img{
  position: absolute;
  top: -55px;
  left: 0;
  width: 100%;
}
.bottom-bg-img{
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
}

.qrcode-wrapper{
  text-align: center;
  z-index: 1;
  width: 100%;
  height: 200px;
  margin-top: 60px;
  position: relative;
  .text{
    color: #36758e;
    font-size: 24px;
    line-height: 50px;
  } 
  .pic{
    width: 170px;
    height: 170px;
  }
}

.Image {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  z-index: 99;
  /* overflow: hidden; */
}

@media screen and (max-device-aspect-ratio: 750/1200) and (min-device-aspect-ratio: 750/1300) {
  .wrapper .content{
    margin-top: 50px;
  }
  .wrapper .share-text{
    margin-top: -120px;
  }
}

@media screen and (max-device-aspect-ratio: 750/1300) and (min-device-aspect-ratio: 750/1400) {
  .wrapper .content{
    margin-top: 70px;
  }
  .wrapper .share-text{
    margin-top: -110px;
  }
}

@media screen and (max-device-aspect-ratio: 750/1400){
  .wrapper .content{
    margin-top: 90px;
  }
  .wrapper .share-text{
    margin-top: -100px;
  }
}
</style>

