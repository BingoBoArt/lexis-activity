<template>
<div class="share" v-if="show && isVisible">
    <img class="close" @click="close" src="~@/assets/img/close-circle.png" alt="">
    <div class="share-all" id="share-all">
      <div class="content">
        <div class="content-inner">
          <p class="nickname">{{res.nickname || ""}}</p>
          <div class="headpic-wrapper">
            <img v-show="res.imgUrl" class="headpic" :src="res.imgUrl">
            <img v-if="res.rank && res.rank >= 1 && res.rank <= 3" class="rank-circle" :src="require(`@/assets/img/headpic${res.rank}.png`)">
            <div v-else class="border-mask"></div>
          </div>
          <div class="score-wrapper">
            <p class="score">{{(res.score || res.score == 0) ? res.score : '--'}}<span>分</span></p>
          </div>
        </div>
      </div>
      <img class="share-text" src="~@/assets/img/share/text.png">
      <div class="qrcode-wrapper">
        <img class="pic" src="~@/assets/img/share/qrcode.png">
        <img class="qrcode-bg" src="~@/assets/img/share/qrcode-bg.png">
      </div>
      <img class="top-bg-img" src="~@/assets/img/share/top-bg.png">
    </div>
    <div id="share-image"></div>
    <div class="overlay"></div>
    <div class="longTap">长按图片保存</div>
</div>
</template>
<script>
import { isNeedBind } from "@base/common/util";
import Request from "@base/common/request";
import html2canvas from "html2canvas";
import LemonUtils from 'lemon-utils';

export default {
  name: "TestTool",
  components: {},
  data: () => {
    return {
      isVisible: false,
      isBlock: "",
      level_config: {
        1: {
          img: require("@/assets/img/logo.jpg")
        },
        2: {
          img: require("@/assets/img/logo.jpg")
        },
        3: {
          img: require("@/assets/img/logo.jpg")
        }
      }
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
            // logging: true, //日志开关，发布的时候记得改成false
          }).then(canvas => {
            // document.body.appendChild(canvas)

            setTimeout(function() {
              let image = convertCanvasToImage(canvas);
              image.style.width = "100%";
              image.style.height = "100%";
              document.querySelector("#share-all").className = "share-all hide";
              document.querySelector("#share-image").appendChild(image);
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
  created: function() {},
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
#share-image {
  width: 690px;
  min-height: 1100px;
  margin: 50px auto 0;
  overflow-y: auto;
}

.share-all {
  width: 96%;
  overflow: auto;
  min-height: 1100px;
  box-sizing: border-box;
  background: url(~@/assets/img/bg.jpg) no-repeat;
  background-size: cover;
  position: relative;
  margin: 50px auto 0;
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
    /* -webkit-text-stroke: 1px white; */ /*no*/
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
      /* -webkit-text-stroke: 1px #c5271e; */ /*no*/
      // letter-spacing: 4px;
      span{
        font-size: 36px;
      }
    }
  }
  .share-text{
    width: 563px;
    height: 101px;
    margin: -100px auto 0;
    display: block;
    position: relative;
    z-index: 1;
  }

  .qrcode-wrapper{
    width: 100%;
    height: 280px;
    background: rgba(98, 177, 227, 0.4);
    position: absolute;
    bottom: 0;
    .pic{
      width: 150px;
      height: 150px;
      position: absolute;
      left: 60px;
      top: 50px;
    }
    .qrcode-bg{
      width: 100%;
      height: 210px;
      margin-top: 46px;
    }
  }
  .top-bg-img{
    position: absolute;
    top: -55px;
    left: 0;
    width: 100%;
  }
}
</style>
