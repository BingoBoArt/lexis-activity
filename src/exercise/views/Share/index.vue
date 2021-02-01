<template>
  <div class="wrapper" v-loading="loading">
    <div class="content">
        <div class="content-inner">
          <p class="nickname textOverflow" :class="{'small': more_than_10_letters}">{{userInfo.nickname || ""}}</p>
          <div class="headpic-wrapper">
            <img v-show="userInfo.headimgurl" class="headpic" :src="userInfo.headimgurl">
          </div>
          <div class="score-wrapper">
            <img class="img" :src="userInfo.share_text">
          </div>
        </div>
    </div>

    <div class="save-btn-wrapper">
      <div class="qrcode-wrapper">
        <p class="text"><span>扫码免费体验</span></p>
        <img class="pic" src="~@/assets/images/share/qrcode.png">
      </div>
      <lemon-button class="save-btn" @click="shareHandle">生成海报分享给好友</lemon-button>
    </div>
    <ShareImg class="Image" :show="shareImgShow" :res="userInfo" @close="onClose"></ShareImg>
  </div>
</template>
<script>
import Request from "@base/common/request.js";
import LemonUtils from 'lemon-utils';
import Share from '@base/components/share/index.js'
import Util from "@/common/util.js";
import ShareImg from "./shareimage.vue";
const share_text_imgs = [
  require('@/assets/images/share/text1.png'),
  require('@/assets/images/share/text2.png'),
  require('@/assets/images/share/text3.png'),
  require('@/assets/images/share/text4.png')
]

export default {
  name: "result",
  components: {
    ShareImg
  },
  data: () => {
    return {
      loading: true,
      shareImgShow: false,
      // ß: false,
      userInfo: {}
    };
  },
  computed: {
    more_than_10_letters() {
      let nickname = this.userInfo.nickname || ""
      return Util.byteLen(nickname) > 10
    }
  },
  methods: {
    onClose() {
      this.shareImgShow = false;
    },
    shareHandle() { 
      this.shareImgShow = true;
    },
    auth() {
      // 获取本地存储数据
      var _local_userinfo = LemonUtils.getLocalStorage("_u_", "json");
      if(_local_userinfo && _local_userinfo.nickname && _local_userinfo.headimgurl){
        this.userInfo = {...this.userInfo, ..._local_userinfo}
        this.loading = false;
        return;
      }
      
      let code = LemonUtils.getUrlParam("code");
      if(code){
        Request({
          url: "/wechat/authorize/" + code,
          // mock: require("@/mock/record.js"),
          type: "get",
          data: {
          }
        }).then(res => {
          if (res.code == "0000") {
            this.userInfo = {...this.userInfo, ...res.data}
            LemonUtils.setLocalStorage("_u_", res.data, "json");
          }
        }).always(() => {
          this.loading = false;
        })
      }else{
        Request({
          url: "/wechat/authorize/url",
          // mock: require("@/mock/record.js"),
          type: "post",
          data: {
            redirectUri: encodeURIComponent(window.location.href)
          }
        }).then(res => {
          if (res.code == "0000") {
            this.loading = false;
            location.replace(res.data.dinfo)
          }
        }).always(() => {
          this.loading = false;
        })
      }
    },
    weixinShare() {
      let shareUrl = location.href
      Share.init({
        title: "免费领取价值399元全能语感课！",
        desc: "北美外教全能语感课，在家就能体验的国际学校纯外教个性化学堂",
        imgUrl: 'http://file.lexislive.com.cn/resource/201903/988224e5-8b73-446a-b382-08a953fe5790.png',
        link: shareUrl
      })
      // AppHandle().share(shareUrl);
    }
  },
  created: async function() {
    this.auth();
    const random_index = Math.floor(Math.random() * share_text_imgs.length)
    this.userInfo.share_text = share_text_imgs[random_index];
  },
  mounted: function() {
    setTimeout(() => {
      this.weixinShare();
    }, 200)
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
  .content{
    width: 100%;
    height: 100%;
    min-height: 1228px;
    background: url(~@/assets/images/share/bg.jpg) no-repeat;
    background-size: contain;
    position: relative;
    overflow: hidden;

    box-sizing: border-box;
    overflow: hidden;
    .content-inner{
      margin-top: 278px;
      position: relative;
      z-index: 1;
    }
  }
  .nickname{
    height: 100px;
    line-height: 100px;
    color: #084d46;
    font-size: 60px;
    /* -webkit-text-stroke: 4px #c5271e; */
    font-weight: bold;
    // text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e;
    // -webkit-text-stroke: 1px white; /*no*/
    // letter-spacing: 4px;
    text-align: center;
    background: url(~@/assets/images/share/name_bg.png) center center no-repeat;
    background-size: contain;

    max-width: 580px;
    margin: 0 auto;

    &.small{
      font-size: 32px;
    }
  }
  .headpic-wrapper{
    width: 290px;
    height: 290px;
    position: relative;
    margin: 0 auto;
    .headpic{
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 290px;
      box-sizing: border-box;
    }
  }

  .score-wrapper{
    background: url(~@/assets/images/share/bg-score.png) no-repeat top center;
    background-size: 403px 140px;
    text-align: center;
    margin: -30px auto 0;
    height: 140px;
    position: relative;
    .img{
      min-height: 62px;
      max-height: 67px;
      margin-top: 8px;
    }
  }
}
.save-btn-wrapper{
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px 0 26px;
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
    background: #f95738;
    margin-top: 40px;
  }
}

.top-bg-img{
  position: absolute;
  top: -36px;
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
  position: relative;
  .text{
    color: white;
    font-size: 20px;
    line-height: 50px;
    width: auto;
    span{
      background: #f95738;
      border-radius: 20px;
      padding: 2px 8px;
    }
  } 
  .pic{
    width: 140px;
    height: 140px;
    box-shadow: 0 0 10px #5a5a5a;
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
/*
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
*/
</style>

