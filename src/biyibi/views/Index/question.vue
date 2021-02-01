<style>
@font-face {
  font-family: 'cn_en';
  src: url('~@/assets/font/cn_en_2.woff2'),
        url('~@/assets/font/cn_en_2.woff'),
        url('~@/assets/font/cn_en_2.ttf');
}
</style>
<template>
    <div class="main-wrap" v-loading="loading">
      <div v-wechat-title="$route.meta.title=issueName" style='background: none;'></div>
      <div v-if = 'quesitonCurIndex != 0' class='page-wrap'>{{quesitonCurIndex}}/{{questionTotal}}</div>
      <div v-if = 'quesitonCurIndex != 0' class='progress-wrap'>
        <span :style="'width:'+ (quesitonCurIndex/questionTotal) * 100 +'%;'" class=''></span>
      </div>
      <!-- <div @click = 'answerSubmit'>test</div> -->
      <Question :selecteAble = 'true' v-on:nextQue = 'answerQuestion' :quesitonCurIndex='quesitonCurIndex' :audioSrc='audioSrc' :style="'opacity:'+ opacity" :questionType = 'questionType' :opacity = 'opacity' :question = 'question' :questionCur = 'questionCur'></Question>
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
        end: false,
        opacity: 1,
        touchAble: true,
        audioSrc: '',
        audioActive: false,
        uuid: '',
        fontDec: {
          '1': '你已经具备了英语学习入门的基本素质，现在从新学徒课程开始好好来训练自己的听、说、词汇等基本功吧！如果觉得不能完全听懂课上外教老师的讲解的话，不要气馁，这是完全正常的。把注意力集中在关键的词汇训练和游戏上，慢慢地你就能听懂更多的内容了！',
          '2': '好样的！你已经具备了一定的英语词汇量，对于一些基础的日常听力也能够应付了。现在从小巫师课程开始来磨练更高级的英语技能吧！学习更多的词汇，开始了解一些语法知识，并试图将这些知识应用到一些简单的日常生活场景中。',
          '3': '太棒了！你已经具备了相当的英语词汇量，可以听懂很多日常的对话了。现在去参加魔法师课程吧！在这里你将学习到更多的高频词汇，更复杂的语法知识。挑战一下自己，看是否能将这些语言能力应用到你的日常学习和交流中。'
        },
        answerRecord: [],
        issueName: ''
      }
    },
    methods: {
      getType(){
        // type 1-1全文本阅读理解   1-2文本+图片   1-3文本+音频   1-4视频和答案 
        let that = this;
        let que_cur = that.questionCur;
        that.questionType = '1-1';
        if(que_cur.hasOwnProperty('text')){
          that.questionType = '1-1';
        }else if(que_cur.hasOwnProperty('imageUrl')){
          that.questionType = '1-2';
        }else if(que_cur.hasOwnProperty('audioUrl')){
          that.questionType = '1-3';
        }else if(que_cur.hasOwnProperty('videoUrl')){
          that.questionType = '1-4';
        }
      },
      showCurQuestion () {
        let that = this;
        let cb = function(){
          that.quesitonCurIndex += 1;
          let questionCur = that.question[that.quesitonCurIndex - 1];
          that.questionCur = questionCur;
          that.getType();
          that.opacity = 1;
          that.touchAble = true;
          if(that.questionType == '1-3'){
            that.audioSrc = questionCur.audioUrl.url;
          }
        }
        let nextQuestion = that.question[that.quesitonCurIndex];
        if(nextQuestion.combinationType == '1-2'){
          that.imgPreload(nextQuestion.stem.url, cb);
        }else{
          cb();
        }
      },
      imgPreload (src, cb) {
        let img = new Image()
        img.src = src;
        img.onload = function(){
          cb();
        }
        img.onerror = function(){
          cb();
        }
        img = null;
      },
      answerSubmit () {
        let that = this;
        if(that.quesitonCurIndex == that.questionTotal){
          that.end = true;
          //评测结果
          console.log(that.answerRecord);
          let answers = [];
          that.answerRecord.map(function(value, index){
            answers.push(JSON.parse(value))
          });
          console.log(answers)
          Request({
            headers: {
              'Content-Type': 'application/json'
            },
            url: '/exercise/submission/result',
            type: 'post',
            data: {
              uuid: that.uuid,
              issueId: that.issueId,
              questions: answers
            }
          }).then((res) => {
            console.log(res);
            if (res.code == "0000") {
              let replaceUrl = '';
              let issueId = LemonUtils.getUrlParam('issueId');
              let issueName = decodeURIComponent(LemonUtils.getUrlParam('issueName'));
              let data = res.data;
              if(that.isApp){
                this.$router.replace({path: "Result", query: {issueId: issueId, issueName: issueName, ...data}});
              }else{
                this.$router.replace({path: "Result", query: {issueId: issueId, issueName: issueName, ...data}});
              }
            } else {
              that.$toast(res.msg);
            }
          })
        }else{
          that.opacity = 0;
          that.audioActive = false;
          let nextQuestion = that.question[that.quesitonCurIndex];
          that.showCurQuestion();
        }
      },
      answerQuestion (reqData, index) {
        let that = this;
        if(!that.touchAble || that.end){
          return;
        }
        this.$set(that.questionCur.options[index], 'active', true);
        that.touchAble = false;
        that.answerRecord.push(reqData)
        that.answerSubmit();
      },
      getQuestions () {
        let that = this;
         Request({
          url: '/exercise/questions',
          // mock: require('@/mock/questions.js'),
          type: 'post',
          data: {
            issueId: LemonUtils.getUrlParam('issueId')
          }
        }).then((res) => {
          console.log(res);
          if (res.code == "0000") {
            that.loading = false;
            console.log('loading:' + that.loading)
            that.questionTotal = res.data.questions.length;
            that.question = res.data.questions;
            that.uuid = res.data.uuid;
            that.showCurQuestion();
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
      console.log("======");
      console.log(that.$route.query.issueId)
      // that.loading = false;
      // that.token = 'tk_66500ebe125645279ee2d56018a2b8a4';
      // that.getQuestions();
      // that.getQuestions();
      that.issueId = LemonUtils.getUrlParam('issueId');
      that.issueName = decodeURIComponent(LemonUtils.getUrlParam('issueName'));
      if(AppHandle.isApp){
        AppHandle.sendTitle({title: that.issueName});
      }
      let userInfo = await UserInfo.getUserInfo(that, {forceWechatLogin: true});
      if(!(userInfo && userInfo.token) && AppHandle.isApp){
        that.$toast("你当前处于游客状态，请先登录哦～");
      }else{
        that.token = userInfo.token;
        that.getQuestions();
      }
    },
    mounted: function () {
      document.body.setAttribute("class", "question-body")
    },
    beforeDestroy() {
      document.body.removeAttribute("class")
    }
  }
</script>
<style scoped>
    /*其中fontName替换为你的字体名称*/
    * {
        /* touch-action: none; */
    }
    html, body {
        overflow: hidden;
    }
    .main-wrap {
        -webkit-user-select: none;
        width: 100%;
        height: 100%;
        /* min-height: 1110px; */
        box-sizing: border-box;
        overflow: auto;
        /* background: linear-gradient(#8ed2f7, #8ed2f8); */
        background: #bbedf8;
        .page-wrap{
          font-size: 30px;
          color: #666;
          text-align: right;
          padding: 16px 26px 0 0;
          background: none;
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
        
    }
</style>

