<template>
<div class="share" v-if="show && isVisible">
    <img class="close" @click="close" src="~@/assets/img/close-circle.png" alt="">
    <div class="share-all" id="share-all" :style="{bg_img}">
        <p class="share-title"><span>{{res.nickname}}</span><img src='~@/assets/img/font-pic1.png'/></p>
        <img class="level" :src="level_config[res.level].img" alt="">
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
    </div>
    <div id="share-image"></div>
    <div class="overlay"></div>
    <div class="longTap">长按这个图片保存</div>
</div>
</template>
<script>
import { isNeedBind } from "@/common/util";
import Request from "@/common/request";
import html2canvas from "html2canvas";
import weui from "weui.js";

export default {
  name: "TestTool",
  components: {},
  data: () => {
    return {
      bg_img: {
        backgroundImage: require("@/assets/img/share_bg.jpg")
      },
      isVisible: false,
      isBlock: "",
      level_config: {
        1: {
          img: require("@/assets/img/ziran.jpg")
        },
        2: {
          img: require("@/assets/img/jinjie.jpg")
        },
        3: {
          img: require("@/assets/img/yubeiji.jpg")
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
      var loading = weui.loading("海报生成中...");
      // await that.loadbg();
      that.isVisible = true;
      await that.toImg();
      loading.hide();
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
    right: 6px;
    top: 28px;
    width: 60px;
    height: 60px;
  }
}
.share-all {
  width: 690px;
  height: 1102px;
  margin: 50px auto 0;
  background: transparent url("~@/assets/img/share_bg.jpg") 0 0 no-repeat;
  z-index: 888;
  background-size: 100% 100%;
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
.share-title {
  padding-top: 226px;
  font-size: 44px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  height: 70px;
  // margin-bottom: 20px;
  white-space: nowrap;
  span {
    display: inline-block;
    // line-height: 50px;
    vertical-align: middle;
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    // top: -4px;
  }
  img {
    vertical-align: middle;
    margin-left: 4px;
    width: 170px;
    height: 36px;
  }
}
.level {
  // width: 204px;
  height: 116px;
  margin: 0px auto 25px;
  display: block;
}
div.share-content {
  width: 580px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  .top {
    width: 580px;
    height: 300px;
    background: white;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    box-shadow: 0px 0px 1px grey;
    p {
      width: 520px;
      height: 240px;
      margin: 0 auto;
      padding-top: 10px;
      padding-bottom: 20px;
      line-height: 42px;
      font-size: 26px;
      text-indent: 2em;
      color: #000;
    }
  }
  .bottom {
    width: 580px;
    height: 300px;
    background: #ffde6b;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: rotate(-3deg);
    box-shadow: 0px 0px 1px grey;
  }
}
.share-bottom {
  display: flex;
  width: 100%;
  height: 320px;
  padding-top: 60px;
  margin: 0 auto;
  .pro-dec {
    width: 324px;
    height: 200px;
    margin-top: 95px;
    margin-left: 20px;
  }
  .erwei {
    width: 220px;
    height: 300px;
    margin-left: 75px;
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
  margin: 50px auto 0;
}
</style>
