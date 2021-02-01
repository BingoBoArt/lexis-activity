<template>
<div class="share" v-if="show && isVisible">
    <img class="close" @click="close" src="~@/assets/images/share/close-circle.png" alt="">
    <div class="share-all" id="share-all">
      <div class="content">
        <div class="content-inner">
          <p class="nickname textOverflow" :class="{'small': more_than_10_letters}">{{res.nickname || ""}}</p>
          <div class="headpic-wrapper">
            <img v-show="res.headimgurl" class="headpic" :src="selfDomainHeadpic">
          </div>
          <div class="score-wrapper">
            <img class="img" :src="res.share_text">
          </div>
        </div>

        <div class="qrcode-wrapper">
          <!-- <img class="pic" src="~@/assets/images/share/qrcode.png"> -->
          <img class="qrcode-bg" src="~@/assets/images/share/qrcode-bg.jpg">
        </div>
      </div>
    </div>
    <div id="share-image">
      <div id="share-image-content"></div>
    </div>
    <div class="overlay"></div>
    <div class="longTap">长按图片保存</div>
</div>
</template>
<script>
import Request from "@base/common/request";
import html2canvas from "html2canvas";
import LemonUtils from 'lemon-utils';
import Util from "@/common/util.js";

export default {
  name: "TestTool",
  components: {},
  data: () => {
    return {
      isVisible: false,
      isBlock: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    res: {
      type: Object,
      default: {}
    }
  },
  computed: {
    selfDomainHeadpic() {
      var headimgurl = this.res.headimgurl
      return "//" + location.hostname + "/" + headimgurl.slice(headimgurl.indexOf("mmopen"))
    },
    more_than_10_letters() {
      let nickname = this.res.nickname || ""
      return Util.byteLen(nickname) > 10
    }
  },
  watch: {
    show: function(newValue, oldValue) {
      let that = this;
      if (newValue) {
        that.createImg();
      }
    }
  },
  methods: {
    async createImg() {
      let that = this;
      that.$loading({
        icon: 1,
        text: '海报生成中...'
      });
      // await that.loadbg();
      that.isVisible = true;
      await that.toImg();
      that.$loadingCloseAll();
    },
    async loadbg() {
      let that = this;
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function() {
          resolve();
        };
        img.src = that.bg_img.backgroundImage;
      });
    },
    async toImg() {
      return new Promise((resolve, reject) => {
        function convertCanvasToImage(canvas) {
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.src = canvas.toDataURL("image/png");
          return image;
        }
        let that = this;

        setTimeout(function() {
          let _dom = document.querySelector("#share-all");
          let _width = _dom.clientWidth;
          let _height = _dom.clientHeight;
          let _size = Math.min(_width, _height);
          let scale = (1500 / _size).toFixed(1);
          scale = scale > 3 ? 3 : scale;
          scale = scale < 1 ? 1 : scale;
          console.log("scale", scale);
          html2canvas(document.querySelector("#share-all"), {
            backgroundColor: "transparent",
            // allowTaint: true, // 允许加载跨域的图片(不需要CROS配合，不支持canvas.toDataURL)
            tainttest: true, //检测每张图片都已经加载完成
            scale: scale, // 添加的scale 参数
            // canvas:canvas, //自定义 canvas
            useCORS: true, // 允许加载跨域的图片(需要CROS配合，且支持canvas.toDataURL)
            logging: true, //日志开关，发布的时候记得改成false
          }).then(canvas => {
            // document.body.appendChild(canvas)

            setTimeout(function() {
              let image = convertCanvasToImage(canvas);
              image.style.width = "100%";
              image.style.height = "100%";
              document.querySelector("#share-all").className = "share-all hide";
              document.querySelector("#share-image-content").appendChild(image);
              image.className = "image";
              resolve();
              document.querySelector(".longTap").style.display = "block";
            }, 1000);
          });
        }, 100);
      });
    },
    close() {
      // this.inner_show = false;
      this.$emit("close");
      this.isVisible = false;
    }
  },
  created: function() {
  },
  mounted: function() {}
};
</script>
<style lang='less' scoped>
.share {
  width: 100%;
  overflow-x: hidden;
  .close {
    position: absolute;
    right: 0px;
    top: 20px;
    width: 60px;
    height: 60px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.44);
    border-radius: 100px;
  }
}
.overlay {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  min-height: 100%;
  background-color: black;
  z-index: -10;
  -moz-opacity: 0.4;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
.longTap {
  display: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1088;
  color: white;
  font-size: 32px;
  text-align: center;
  line-height: 80px;
  -webkit-animation: sport 0.5s;
  animation: sport 0.5s;
  transform: translateY(0px);
}
@keyframes sport {
  0% {
    transform: translateY(80px);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0px);
    opacity: 0.6;
  }
}
.hide {
  display: none;
}
.image {
  width: 690px;
  margin: 50px auto 0;
}

#share-image{
  overflow-y: auto;
  height: 100%;
}

#share-image-content{
  width: 690px;
  margin: 50px auto 0;
  overflow-y: auto;
}

.share-all {
  width: 95%;
  overflow: auto;
  min-height: 1300px;
  box-sizing: border-box;
  background-size: cover;
  position: relative;
  margin: 50px auto 0;
  .content{
    width: 100%;
    height: 100%;
    min-height: 1178px;
    background: white url(~@/assets/images/share/bg.jpg) no-repeat;
    background-size: contain;
    position: relative;
    overflow: hidden;

    box-sizing: border-box;
    overflow: hidden;
    .content-inner{
      margin-top: 256px;
      position: relative;
      z-index: 1;
      height: 775px;
    }
  }
  .nickname{
    height: 100px;
    line-height: 100px;
    color: #084d46;
    font-size: 58px;
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
      font-size: 31px;
    }
  }
  .headpic-wrapper{
    width: 280px;
    height: 280px;
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

  .qrcode-wrapper{
    width: 100%;
    height: 220px;
    margin-top: 0;
    .pic{
      width: 135px;
      height: 135px;
      position: absolute;
      left: 54px;
      top: 100px;
    }
    .qrcode-bg{
      width: 100%;
    }
  }
  .top-bg-img{
    position: absolute;
    top: -36px;
    left: 0;
    width: 100%;
  }
}
</style>
