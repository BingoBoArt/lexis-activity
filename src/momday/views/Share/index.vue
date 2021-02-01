<template>
  <div class="wrapper" v-loading="loading">

    <div class="content">
        <div class="content-inner">
          <div class="headpic-wrapper">
            <img v-show="userInfo.headimgurl" class="headpic" :src="userInfo.headimgurl">
          </div>
          <p class="nickname textOverflow" :class="{'small': more_than_10_letters}">{{userInfo.nickname || ""}}</p>
          <div class="score-wrapper">

            <div class="thanks" >
              <div class="numpic">
                <img v-for="(item,index) in imagesrc" :key="index" :src="getImgUrl(item)" alt="" >
              </div>
            </div>

          </div>
        </div>
    </div>

    <div class="save-btn-wrapper" ref="btn">
      <div class="qrcode-wrapper">
        <img class="pic" src="~@/assets/images/share/qrpay.png">
      </div>
      <lemon-button class="save-btn" @click="shareHandle">生成海报分享给好友</lemon-button>
    </div>

    <ShareImg class="Image" :show="shareImgShow" :days="days" :imagesrc="imagesrc" :res="userInfo" @close="onClose"></ShareImg>
  </div>
</template>
<script>
import Request from "@base/common/request.js";
import LemonUtils from 'lemon-utils';
import Share from '@base/components/share/index.js'
import UserInfo from '@base/components/userInfo/index.js'
import Util from "@/common/util.js";
import ShareImg from "./shareimage.vue";

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
      userInfo: {},
      days: 0,
      imagesrc: [],
    };
  },
  computed: {
    more_than_10_letters() {
      let nickname = this.userInfo.nickname || ""
      return Util.byteLen(nickname) > 10
    }
  },
  methods: {
    getImgUrl(num) {
      return require("@/assets/images/share/" + num + ".png")
    },
    onClose() {
      this.shareImgShow = false;
    },
    getdays(res) {
      let that = this
      // alert(res)
      Request({
        url: "/student/live/day/" + res,
        type: "get",
        data: {
        }
      }).then(res => {
        // console.log("日期")
        // console.log(res)
        if (res.code == "0000") {
          // console.log("陪伴你孩子的天数", res.data.days)

          let data = res.data.days
          // let data = 61
          this.imagesrc = data.toString().split("")
        } else if(res.code == "8026") {
          UserInfo.getUserInfo(this).then((res) => {
            // console.log("userInfo", res)
          }).catch(err => {
            console.log(err)
          })

          // 或者返回8026时，表示用户没有绑定过账号，跳到登录
          this.$router.replace({path: "login"})
          //或者不跳转登陆页，直接天数赋值为 0 天
          // let data = 0
          // this.imagesrc = data.toString().split("")
        }
      })
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
          // alert("返回code")
          if (res.code == "0000") {
            // console.log("这是用code拿的德德回的数据")
            this.userInfo = {...this.userInfo, ...res.data}
            let users = this.userInfo
            // console.log(users)
            for(let key in users){ 
              if(key === "open_id") {
                let ooid = users[key]
                this.getdays(ooid)
              }
            }
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
            // console.log("这是没有code时,去登录验证接口")
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
        title: "还在为孩子的英语启蒙发愁吗？知乎高赞回答",
        desc: "坚持一“夏”，50个赞赢价值300元的雅漾防晒霜！",
        imgUrl: 'http://file.lexislive.com.cn/resource/201903/988224e5-8b73-446a-b382-08a953fe5790.png',
        link: shareUrl
      })
      // AppHandle().share(shareUrl);
    }
  },
  created: async function() {
    this.auth();
    // console.log("分享之前的头像路径", this.userInfo)
    let userin = this.userInfo
    for(let key in userin){ 
      if(key === "open_id") {
        // alert(userin[key])
        let openid = userin[key]
        this.getdays(openid)
      }
    }
    // const random_index = Math.floor(Math.random() * share_text_imgs.length)
    // this.userInfo.share_text = share_text_imgs[random_index];
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
    background: url(~@/assets/images/share/finalbg.jpg) no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;

    box-sizing: border-box;
    overflow: hidden;
    .content-inner{
      margin-top: 260px;
      position: relative;
      z-index: 1;
    }
  }
  .nickname{
    height: 80px;
    line-height: 76px;
    color: #333;
    font-size: 32px;
    // -webkit-text-stroke: 4px #c5271e;
    font-weight: bold;
    // text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e;
    // -webkit-text-stroke: 1px white; /*no*/
    letter-spacing: -1.6px;
    text-align: center;
    // background: url(~@/assets/images/share/name_bg.png) center center no-repeat;
    background-size: contain;
    max-width: 430px;
    margin: 0 auto;
    &.small{
      font-size: 32px;
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
    background: url(~@/assets/images/share/thanks.png) no-repeat top center;
    background-size:554px 182px;
    text-align: center;
    height: 180px;
    position: relative;
    padding-top:122px;
    .thanks{
      padding-left: 236px;
      .numpic{
        width: 130px;
        height: 54px;
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
}
.save-btn-wrapper{
  width: 100%;
  background: url(~@/assets/images/share/whitebottom.png) no-repeat center;
  background-size:100% 100%;
  background-position-y: 80px;
  // background-color: rgba(255, 255, 255, 0.5);
  // padding: 0 0 26px;
  // border-radius: 28% 28% 0 0;
  padding-bottom:26px;
  position: fixed;
  left: 0;
  // bottom: 26px;
  bottom:0px;
  z-index: 3;
  .save-btn {
    display: block;
    width: 84%;
    height: 84px;
    margin: auto;
    line-height: 70px;
    border-radius: 50px;
    font-size: 34px;
    color: white;
    border: none;
    background: #f95738;
    // background: #f2ba97;
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
  // margin-top:-100px;
  // height: 200px;
  position: relative;
  .pic{
    width: 130px;
    height: 130px;
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

