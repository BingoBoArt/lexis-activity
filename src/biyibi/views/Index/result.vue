<template>
  <div class="wrapper">
    <div class="result-content">
      <div class='light-wrapper lighting' v-show="showAnimate"></div>
      <div class="headpic-wrapper">
        <img class="headpic" :src="userInfo.imgUrl">
        <img v-if="params.rank && params.rank >= 1 && params.rank <= 3" class="rank-circle" :src="require(`@/assets/img/headpic${params.rank}.png`)">
        <div v-else class="border-mask"></div>
      </div>
      <div class="score-wrapper">
        <p class="score">{{params.score || '--'}}<span>分</span></p>
      </div>
    </div>

    <img class="result-text" src="~@/assets/img/result/text.png">
    <div class="result-btns clearfix">
      <btnBasic class='result-btn btn-view' color='' @click='toDec()'>
        <img src='~@/assets/img/icon-view.png' />
      </btnBasic>

      <btnBasic class='result-btn btn-again' color='green' @click='againHandle()'>
        <img src='~@/assets/img/result/icon-again.png' />
        <span class="nextStar">-{{params.nextStar}}</span>
      </btnBasic>

      <btnBasic class='result-btn btn-share' color='' @click='shareHandle()'>
        <img src='~@/assets/img/icon-share.png' />
      </btnBasic>
    </div>
  </div>
</template>
<script>
import Request from "@base/common/request.js";
import AppHandle from "@base/common/appHandle.js";
import LemonUtils from 'lemon-utils';
import Share from '@base/components/share/index.js'
import UserInfoCom from '@base/components/userInfo/index.js'
import btnBasic from "@/components/btn-basic/index.vue";
export default {
  name: "result",
  components: {
    btnBasic
  },
  data: () => {
    return {
      loading: true,
      showAnimate: false,
      params: {
        "issueId": '',
        "issueName": '',
        "score": '--', // 本次答题得分
        "uuid": "28bdb4e251cd428ea79246244ab0c72e",
        "nextStar": 0, // 下次答题需要的星星数量
        "rank": 0, 
        "surplus": 0 // 用户剩余星星数量
      },
      userInfo: {
        imgUrl: 'http://file.lexislive.com.cn/resource/201901/9b35e2d7-8794-4575-8337-73bf49795013.png'
      }
    };
  },
  methods: {
    toDec() {
      this.$router.push({path: "AnswerDec", query: {issueId: this.params.issueId, uuid: this.params.uuid}});
    },
    getResult() {
      let that = this;
      Request({
        url: "/liveapi/exercise/history/questions/" + this.params.uuid,
        // mock: require("@/mock/result.js"),
        type: "post",
        data: {
        }
      }).then(res => {
        if (res.code == "0000") {
          that.resultInfo = res.data;
        }
      }).always(() => {
        that.loading = false;
      })
    },
    againHandle() {
      const params = this.params;
      console.log(params)
      if(params.nextStar - params.surplus > 0){
        this.$dialog({
          title: '',
          content: '没有足够的星星啦！',
          btn_right_text: '取消挑战',
          btn_left_text: ''
        });
      }else{
        this.$router.push({path: "question", query: {issueId: params.issueId, issueName: decodeURIComponent(params.issueName)}});
      }
    },
    shareHandle() {
      let shareUrl = location.href.split("#")[0] + "#/Share?uuid=" + this.params.uuid;
      Share.do({
        title: "我正在英语天天见学英语！",
        desc: "北美外教天天直播！快来跟我一起学吧！",
        imgUrl: 'http://file.lexislive.com.cn/resource/201901/76440a00-5c94-41d0-b4ed-ed311009593a.png',
        link: shareUrl
      })
      // AppHandle().share(shareUrl);
    }
  },
  created: async function() {
    let that = this;
    let params = LemonUtils.getUrlParam();
    // let params = require("@/mock/result.js").data;
    let userInfo = await UserInfoCom.getUserInfo(that, {forceWechatLogin: true});
    // let userInfo = {};
    that.params = params;
    that.userInfo = userInfo;
    console.log("getUrlParam", params);
    // that.getResult();
  },
  mounted: function() {
    setTimeout(() => {
      this.showAnimate = true;
    }, 500)
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
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: url(~@/assets/img/bg.jpg) no-repeat;
  background-size: cover;
  .result-content{
    margin: -40px auto 0;
    width: 750px;
    height: 730px;
    // background: url(~@/assets/img/light.png) no-repeat;
    background-size: cover;
    box-sizing: border-box;
    // padding-top: 200px;
    position: relative;
    transform: translateZ(0);
    overflow: hidden;
  }
  .light-wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    &.moveEnter{
      animation: moveEnter 5s infinite;
      background: url(~@/assets/img/result/animate/HighLight_00004.png) no-repeat;
        background-position: center center;
        animation-timing-function: linear;
    }
    &.lighting{
      // background: url(~@/assets/img/result/animate/HighLight_00005.png) no-repeat;
      background: url(~@/assets/img/light3.png) no-repeat;
      background-position: center center;
      background-size: contain;
      animation: lighting 0.7s 1;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      transform: rotate(0deg);
    }
    @keyframes moveEnter{
      0% {
        background: url(~@/assets/img/result/animate/HighLight_00000.png) no-repeat;
        background-size: contain;
        background-position: center center;
      }
      25% {
        background: url(~@/assets/img/result/animate/HighLight_00001.png) no-repeat;
        background-size: contain;
        background-position: center center;
      }
      50% {
        background: url(~@/assets/img/result/animate/HighLight_00002.png) no-repeat;
        background-size: contain;
        background-position: center center;
      }
      75% {
        background: url(~@/assets/img/result/animate/HighLight_00003.png) no-repeat;
        background-size: contain;
        background-position: center center;
      }
      100% {
        background: url(~@/assets/img/result/animate/HighLight_00004.png) no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }
    @keyframes lighting{
      0% {
        transform: rotate(0deg) scale(0.2);
        background-size: contain;
        opacity: 0.6;
      }
      10% {
        transform: rotate(0deg) scale(0.3);
        background-size: contain;
        opacity: 0.8;
      }
      20% {
        transform: rotate(0deg) scale(0.6);
        background-size: contain;
        opacity: 1;
      }
      30% {
        transform: rotate(0deg) scale(0.8);
        background-size: contain;
        opacity: 0.9;
      }
      40% {
        transform: rotate(0deg) scale(0.9);
        background-size: contain;
        opacity: 0.8;
      }
      50% {
        transform: rotate(0deg) scale(0.95);
        background-size: contain;
        opacity: 0.7;
      }
      60% {
        transform: rotate(0deg) scale(0.9);
        background-size: contain;
        opacity: 0.8;
      }
      70% {
        transform: rotate(0deg) scale(0.8);
        background-size: contain;
        opacity: 0.9;
      }
      80% {
        transform: rotate(0deg) scale(0.7);
        background-size: contain;
        opacity: 1;
      }
      90% {
        transform: rotate(0deg) scale(0.7);
        background-size: contain;
        opacity: 1;
      }
      100% {
        transform: rotate(0deg) scale(0.8);
        background-size: contain;
        opacity: 1;
      }

      /*
      0% {
        transform: rotate(0deg) scale(0.1);
        background-size: contain;
        opacity: 0.5;
      }
      5% {
        transform: rotate(0deg) scale(0.3);
        background-size: contain;
        opacity: 0.6;
      }
      10% {
        transform: rotate(0deg) scale(0.5);
        background-size: contain;
        opacity: 1;
      }
      15% {
        transform: rotate(0deg) scale(1.2);
        background-size: contain;
        opacity: 1;
      }
      20% {
        transform: rotate(0deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      25% {
        transform: rotate(30deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      30% {
        transform: rotate(60deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      35% {
        transform: rotate(90deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      40% {
        transform: rotate(120deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      45% {
        transform: rotate(150deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      50% {
        transform: rotate(180deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      55% {
        transform: rotate(210deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      60% {
        transform: rotate(240deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      65% {
        transform: rotate(270deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      70% {
        transform: rotate(300deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      75% {
        transform: rotate(325deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      80% {
        transform: rotate(340deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      85% {
        transform: rotate(350deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      90% {
        transform: rotate(355deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      95% {
        transform: rotate(358deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      100% {
        transform: rotate(360deg) scale(1);
        background-size: contain;
        opacity: 1;
      }
      */
    }
  }
  .headpic-wrapper{
    width: 290px;
    height: 290px;
    position: relative;
    margin: 200px auto 0;
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
      // -webkit-text-stroke: 1px #c5271e; /*no*/
      // letter-spacing: 4px;
      span{
        font-size: 36px;
      }
    }
  }
  .result-text{
    width: 506px;
    height: 66px;
    margin: -60px auto 0px;
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
      position: relative;
      img{
        width: 251px;
        height: 39px;
      }
      .nextStar{
        position: absolute;
        right: 10px;
        color: #04c937;
        font-size: 30px;
        font-weight: 600;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        right: 51px;
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


@media screen and (max-device-aspect-ratio: 750/1200) and (min-device-aspect-ratio: 750/1300) {
  .wrapper .content{
    margin-top: 80px;
  }
  .wrapper .share-text{
    margin-top: -50px;
  }
}

@media screen and (max-device-aspect-ratio: 750/1300) and (min-device-aspect-ratio: 750/1400) {
  .wrapper .content{
    margin-top: 120px;
  }
  .wrapper .share-text{
    margin-top: -20px;
  }
}

@media screen and (max-device-aspect-ratio: 750/1400){
  .wrapper .content{
    margin-top: 160px;
  }
  .wrapper .share-text{
    margin-top: 10px;
  }
}
</style>

