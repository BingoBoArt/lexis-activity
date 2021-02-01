<style>
@font-face {
  font-family: 'cn_en';
  src: url('~@/assets/font/cn_en_2.woff2'),
        url('~@/assets/font/cn_en_2.woff'),
        url('~@/assets/font/cn_en_2.ttf');
}
</style>
<template>
    <div class="main-wrap touchScrolling" v-loading="loading">
      <div class="top-wrapper" v-show = 'issueName'>
        <p class='score-wrap'>{{score}}<span>分</span></p>
        <p class='issue' >{{issueName}}</p>
      </div>
      <Question from="answer_dec" class='question-item' v-for='(item, index) in question' :key="index"  :quesitonCurIndex='index+1' :audioSrc='(item.audioUrl && item.audioUrl.url) || ""' :style="'opacity:'+ opacity" :questionType = 'getType(item)' :opacity = '1' :question = 'question' :questionCur = 'item'></Question>
    </div>
</template>
<script>
  import Request from "@base/common/request.js";
  import AppHandle from "@base/common/appHandle.js";
  import UserInfo from '@base/components/userInfo/index.js'
  import LemonUtils from 'lemon-utils';
  import Question from "@/components/question/index.vue";
  export default {
    name: 'GetVip',
    components: {
      Question
    },
    data: () => {
      return {
        loading: true,
        isApp: '',
        token: '',
        questionType: '',
        quesitonCurIndex: 0,
        questionTotal: 0,
        question: [],
        questionCur: {},
        errorAnswer: [],
        end: false,
        opacity: 1,
        touchAble: true,
        audioSrc: '',
        audioActive: false,
        uuid: '',
        issueName: '',
        month: '',
        score: ''
      }
    },
    methods: {
      getType(que_cur){
        // type 1-1全文本阅读理解   1-2文本+图片   1-3文本+音频   1-4视频和答案 
        let questionType = '1-1';
        if(que_cur.hasOwnProperty('text')){
          questionType = '1-1';
        }else if(que_cur.hasOwnProperty('imageUrl')){
          questionType = '1-2';
        }else if(que_cur.hasOwnProperty('audioUrl')){
          questionType = '1-3';
        }else if(que_cur.hasOwnProperty('videoUrl')){
          questionType = '1-4';
        }
        return questionType;
      },
      getResult(){
        let that = this;
        // exercise/history/questions
         Request({
          url: `/exercise/history/questions/${LemonUtils.getUrlParam('uuid')}`,
          // mock: require('@/mock/questions.js'),
          type: 'get',
          data: {
          }
        }).then((res) => {
          console.log(res);
          if (res.code == "0000") {
            that.issueName = res.data.issueName;
            that.month = res.data.month;
            that.score = res.data.score;
            this.question = res.data.questions;
          } else {
            that.$toast(res.msg);
          }
        }).always(() => {
          that.loading = false;
          // console.log("that.loading", that.loading)
        })
      },
      getHistory () {
        let that = this;
        // exercise/history/questions
         Request({
          url: '/exercise/history/questions',
          // mock: require('@/mock/questions.js'),
          type: 'post',
          data: {
            issueId: LemonUtils.getUrlParam('issueId')
          }
        }).then((res) => {
          console.log(res);
          if (res.code == "0000") {
            that.issueName = res.data.issueName;
            that.month = res.data.month;
            that.score = res.data.score;
            this.question = res.data.questions;
          } else {
            that.$toast(res.msg);
          }
        }).always(() => {
          that.loading = false;
          // console.log("that.loading", that.loading)
        })
      }
    },
    beforeCreate: function(){
      let that = this;
    },
    created: async function () {
      let that = this;
      // that.loading = false;
      // that.token = 'tk_66500ebe125645279ee2d56018a2b8a4';
      // that.getQuestions();
      let userInfo = await UserInfo.getUserInfo(that, {forceWechatLogin: false});
      if(!(userInfo && userInfo.token) && AppHandle.isApp){
        that.$toast("你当前处于游客状态，请先登录哦～");
      }else{
        that.token = userInfo.token;
        that.uuid = LemonUtils.getUrlParam('uuid');
        if(that.uuid){
          that.getResult()
        }else{
          that.getHistory()
        }
      }
    },
    mounted: function () {
      let that = this;
    }
  }
</script>
<style scoped>
    /*其中fontName替换为你的字体名称*/
    * {
        /* touch-action: none; */
    }
    html, body {
    }
    .main-wrap {
        -webkit-user-select: none;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
        background: #bbedf8;
        .top-wrapper{
          background: url(~@/assets/img/bg-score.png) no-repeat top center;
          background-size: 403px 140px;
          text-align: center;
          margin: 32px auto;
          .score-wrap{
            height: 72px;
            line-height: 72px;
            color: #fff;
            font-size: 56px;
            /* -webkit-text-stroke: 4px #c5271e; */
            font-weight: bold;
            /* text-shadow: 0 4px #c5271e, 4px 0 #c5271e, -4px 0 #c5271e, 0 -4px #c5271e; */
            /* -webkit-text-stroke: 1px #c5271e; */ /*no*/
            /* letter-spacing: 4px; */
            span{
              font-size: 36px;
            }
          }
          .issue{
            font-size: 30px;
            color: #186288;
            text-align: center;
            font-weight: bold;
            margin-top: 62px;
          }
        }
        .page-wrap{
          font-size: 30px;
          color: #fff;
          text-align: right;
          padding: 16px 26px 0 0;
        }
        .progress-wrap{
          height: 12px;
          /* border: 2px solid #fff;px*/
          background: #ffffff;
          /* border-radius: 4px; */
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          span{
            display: block;
            height: 100%;
            background: #139c1d;
            transition: width 0.5s ease-out;
            width: 0;
          }
        }
        
        .question-item{
          margin-bottom: 100px;
        }
    }
</style>

