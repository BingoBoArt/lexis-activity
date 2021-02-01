<template>
<div class="share" v-if="show && isVisible">
    <img class="close" @click="close" src="~@/assets/images/share/close-circle.png" alt="">
    <div class="share-all" id="share-all">




      <div class="content">
        <div class="content-inner">
          <div class="headpic-wrapper">
            <img v-show="res.headimgurl" class="headpic" :src="selfDomainHeadpic"> 
          </div>
          <p class="nickname textOverflow" :class="{'small': more_than_10_letters}">{{res.nickname || ""}}</p>
          <div class="score-wrapper">
            <div class="thankbg">
              <img src="~@/assets/images/share/thanks.png" alt="">
            </div>
            <div class="thanks">
              <div class="numpic">
                <img v-for="(item,index) in imagesrc" :key="index" :src="getImgUrl(item)" alt="" >
              </div>
            </div>

          </div>
        </div>
                                                     
                                                              
        <div class="qrcode-wrapper">
          <div class="btnbg-wrapper">
            <img class="btnbg" src="~@/assets/images/share/whitebottom.png" alt="">
          </div>
          <div class="qr-wrapper">
            <img class="pic" src="~@/assets/images/share/qrpay.png">
          </div>
          <div class="desciption">
            <img src="~@/assets/images/share/description.png" alt="">
          </div>
          <!-- <img class="qrcode-bg" src="~@/assets/images/share/qrcode-bg.jpg"> -->
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
    imagesrc: {
      type: Array,
      default: [0]
    },
    days: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    res: {
      type: Object,
      default: {}
    }
  },
  created: function() {
    // console.log("街区")
    if(this.res.nickname) {
      let cusname = this.res.nickname
      let len = cusname.length
      // console.log(cusname)
      if(len >= 14) {
        this.res.nickname = cusname.substring(0, 14) + "..."
      }
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
    getImgUrl(num) {
      return require("@/assets/images/share/" + num + ".png")
    },
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
          image.crossOrigin = "Anonymous";
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
          // console.log("scale", scale);
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
              // console.log(canvas)
              // console.log("这是canvas生成的图片，生成的海报里就没有头像", image)
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
  // opacity：0;  //试一下
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
    background: white url(~@/assets/images/share/finalbg.jpg) no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;

    box-sizing: border-box;
    overflow: hidden;
    .content-inner{
      margin-top: 260px;
      position: relative;
      z-index: 1;
      height: 775px;
    }
  }
  .nickname{
    height: 68px;
    line-height: 66px;
    color: #333;
    font-size: 32px;
    /* -webkit-text-stroke: 4px #c5271e; */
    font-weight: bold;
    // text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e;
    // -webkit-text-stroke: 1px white; /*no*/
    letter-spacing: -1.6px;
    text-align: center;
    // background: url(~@/assets/images/share/name_bg.png) center center no-repeat;
    background-size: contain;

    max-width: 580px;
    margin: 0 auto;

    &.small{
      font-size: 22px;

    }
  }
  .headpic-wrapper{
    width: 170px;
    height: 170px;
    position: relative;
    margin: 0 auto;
    border-radius: 50%;
    border: 6px solid #fff;
    .headpic{
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 50%;
      box-sizing: border-box;
    }
  }

  .score-wrapper{
    // background: url(~@/assets/images/share/thanks.png) no-repeat top center;
    // background-size: 554px 182px;
    text-align: center;
    height: 180px;
    position: relative;
    // padding-top: 124px;
    .thankbg{
      width: 557px;
      height: 186px;
      margin: auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .thanks{
      position: absolute;
      top: 125px;
      left: 220px;
      .numpic{
        width: 124px;
        height: 50px;
        display: flex;
        overflow: hidden;
        justify-content: center;
        img{
          width: 40px;
          height: 100%;
        }
      }
    }
    .img{
      min-height: 62px;
      max-height: 67px;
      margin-top: 8px;
    }
  }

  .qrcode-wrapper{
    width: 100%;
    height: 230px;
    // display: flex;
    // flex-direction:row; 
    // background: url(~@/assets/images/share/whitebottom.png) no-repeat bottom;
    margin-top: 0;
    // background-size:100%;
    position:relative;
    .btnbg-wrapper{
      height:100%;
      width:100%;
      .btnbg{
        width:100%;
        height:100%;
        // display: inline;
      }
    }
    .desciption{
      position: absolute;
      width: 404px;
      height: 144px;
      top: 35px;
      left: 250px;
      // right: 0px;
      // background: url(~@/assets/images/share/description.png) no-repeat;
      // background-size: 410px 150px;
      // background-position-y: 66px;
      // flex:2;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .qr-wrapper{
      position: absolute;
      top: 38px;
      left: 67px;
      // padding-top:66px;
      width:146px;
      height:146px;
      // margin-left:70px;
      // margin-right:36px;
      .pic{
        width: 146px;
        height: 146px;
        box-shadow: 0px 0px 2px 2px rgb(180, 173, 173);
      }
      .qrcode-bg{
        width: 100%;
      }
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
