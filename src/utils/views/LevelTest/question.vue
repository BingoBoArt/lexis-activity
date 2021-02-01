<style>
@font-face {
  font-family: 'cn_en';
  src: url('~@/assets/font/cn_en_2.woff2'),
        url('~@/assets/font/cn_en_2.woff'),
        url('~@/assets/font/cn_en_2.ttf');
}
</style>
<template>
    <div class="main-wrap">
      <div v-if = 'quesitonCurIndex != 0' class='page-wrap'>{{quesitonCurIndex}}/{{questionTotal}}</div>
      <div v-if = 'quesitonCurIndex != 0' class='progress-wrap'>
        <span :style="'width:'+ (quesitonCurIndex/questionTotal) * 100 +'%;'" class=''></span>
      </div>
      <!-- type 1-1全文本   1-2文本+图片   1-5文本+音频 -->
      <div class='question-wrap' :style="'opacity:'+ opacity">
        <div v-if='questionType=="1-1"' class='question-text'>
          <p>{{questionCur.stem.text}}</p>
        </div>
        <div v-if='questionType=="1-2" || questionType=="1-5"' class='question-img-audio'>
          <p>{{questionCur.stem.text}}</p>
        </div>
        <div v-if='questionType=="1-2"' class='img-wrap'>
          <img class='question-img' :src='questionCur.stem.url' /> 
        </div>
        <a href='javascript:void(0)' v-if='questionType=="1-5"'  :class="audioActive ? 'audio-wrap audio-play' : 'audio-wrap'"  @click = 'audioPlay()'>
          <audio :src="audioSrc" controls="controls" preload id="audio" hidden></audio>
          <img class='icon-audio' :src='audioActive ? require("@/assets/img/icon-audio.gif") : require("@/assets/img/icon-audio.png")'/>
          <!-- <span class='icon-audio'></span> -->
        </a>
      </div>
      <ul class='option-wrap' :style="'opacity:'+ opacity" v-if='question.length>0'>
        <li v-for='(item, index) in questionCur.listOption' :key="index">
          <!-- {{item.item}}  -->
          <a :class="item.active ? 'active' : ''" @click='answerQuestion(item.isRight == 1 ? false : questionCur.level, index)' href='javascript:void(0)'>{{item.text}}</a>
        </li>
      </ul>
    </div>
</template>
<script>
  import Request from "@/common/request.js";
  import AppHandle from "@/common/appHandle.js";
  import Events from "@/common/events.js";
  import Tip from "@/components/tip/index.js";
  import LemonUtils from 'lemon-utils';

  export default {
    name: 'GetVip',
    components: {},
    data: () => {
      return {
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
        fontDec: {
          '1': '你已经具备了英语学习入门的基本素质，现在从自然拼读课程开始好好来训练自己的听、说、词汇等基本功吧！如果觉得不能完全听懂课上外教老师的讲解的话，不要气馁，这是完全正常的。把注意力集中在关键的词汇训练和游戏上，慢慢地你就能听懂更多的内容了！',
          '2': '好样的！你已经具备了一定的英语词汇量，对于一些基础的日常听力也能够应付了。现在从词汇语感进阶课程开始来磨练更高级的英语技能吧！学习更多的词汇，开始了解一些语法知识，并试图将这些知识应用到一些简单的日常生活场景中。',
          '3': '太棒了！你已经具备了相当的英语词汇量，可以听懂很多日常的对话了。现在去参加KET预备级课程吧！在这里你将学习到更多的高频词汇，更复杂的语法知识。挑战一下自己，看是否能将这些语言能力应用到你的日常学习和交流中。'
        },
        answerRecord: []
      }
    },
    methods: {
      goBack () {
        // weui.dialog({
        //   title: '',
        //   content: '确定将不保存答题进度',
        //   className: 'custom-classname',
        //   buttons: [{
        //       label: '取消',
        //       type: 'default',
        //       onClick: function () {}
        //   }, {
        //       label: '确定',
        //       type: 'primary',
        //       onClick: function () {
        //         AppHandle().toHome();
        //       }
        //   }]
        // })
      },
      audioPlay () {
        let that = this;
        let audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.play();
        that.audioActive = true;
        audio.onended = function() {
          that.audioActive = false;
        };
      },
      showCurQuestion () {
        let that = this;
        let cb = function(){
          that.quesitonCurIndex += 1;
          // console.log(that.quesitonCurIndex)
          let questionCur = that.question[that.quesitonCurIndex - 1];
          that.questionCur = questionCur;
          // console.log(that.questionCur)
          // console.log(that.questionCur)
          that.questionType = questionCur.combinationType;
          that.opacity = 1;
          that.touchAble = true;
          if(that.questionType == '1-5'){
            that.audioSrc = questionCur.stem.url;
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
      errorSubmit () {
        let that = this;
        if(that.quesitonCurIndex == that.questionTotal){
          that.end = true;
          console.log(that.errorAnswer)
          let level = 3;
          if(that.errorAnswer.length > 0){
            level = Math.min.apply(null, that.errorAnswer);
          }
          console.log(`level: ${level}`);
          //评测结果
          Request({
            headers: {
              token: that.token
            },
            url: '/liveapi/assessment/add/result',
            type: 'post',
            data: {
              level: level,
              text: that.fontDec[level],
              assessmentUuid: that.uuid
            }
          }).then((res) => {
            // console.log(1111)
            console.log(res);
            if (res.code == 0) {
              // Tip.success('');
              let replaceUrl = '';
              if(that.isApp){
                replaceUrl = location.href.split('#')[0] + '?uuid=' + that.uuid + '#/LevelResult';
              }else{
                replaceUrl = location.href.split('#')[0] + '?uuid=' + that.uuid + '#/LevelShare';
              }
              window.location.replace(replaceUrl);
            } else {
              Tip.error(res.msg);
            }
          })
        }else{
          that.opacity = 0;
          that.audioActive = false;
          let nextQuestion = that.question[that.quesitonCurIndex];
          that.showCurQuestion();
        }
      },
      answerQuestion (errorlLevel, index) {
        let that = this;
        if(!that.touchAble || that.end){
          return;
        }
        this.$set(that.questionCur.listOption[index], 'active', true);
        that.touchAble = false;
        if(errorlLevel){
          // 存放答错题目的level 最后找出最小的level
          that.errorAnswer.push(errorlLevel);
        }
        if(index || index == 0){
          if(that.token){
            // 上报答题记录   传 选项 uuid 答案 编号
            Request({
              headers: {
                token: that.token
              },
              url: '/liveapi/assessment/add/record',
              type: 'post',
              data: {
                quesId: that.questionCur.quesId,
                option: that.questionCur.listOption[index].text,
                recordUuid: that.uuid
              }
            }).then((res) => {
              if(res.code == 0){
                console.log('答题结果提交成功')
              }
            }).always(() => {
              that.errorSubmit();
            })
          }else{
            that.errorSubmit();
          }
        }
      },
      getQuestions () {
        let that = this;
         Request({
          url: '/liveapi/assessment/questions',
          // mock: require('@/mock/questions.js'),
          type: 'post',
          data: {}
        }).then((res) => {
          console.log(res);
          // console.log(8)
          if (res.code == 0) {
            that.questionTotal = res.data.assessmentList.length;
            that.question = res.data.assessmentList;
            that.uuid = res.data.uuid;
            // console.log(that.questionTotal)
            // console.log(that.question)
            // console.log(that.uuid)
            that.showCurQuestion();
          } else {
            Tip.error(res.msg);
          }
          that.$loading.hide();
        }).always(() => {
          that.$loading.hide();
        })
      }
    },
    beforeCreate: function(){
      let that = this;
      that.$loading.show();
    },
    created: function () {
      let that = this;
      // that.token = 'tk_66500ebe125645279ee2d56018a2b8a4';
      // that.getQuestions();
      that.isApp = window.lxJsBridge && window.lxJsBridge.send;
      if(that.isApp){
        Events.on("get_userInfo", (data) => {
          console.log("get_userInfo", data);
          that.token = data.token;
          that.getQuestions();
        });
      }else{
        // console.log(777)
        that.token = LemonUtils.getLocalStorage('we-token') || "";
        // console.log("that.token=>", that.token)
        that.getQuestions();
      }
      AppHandle().init();
    },
    mounted: function () {
      let that = this;
    }
  }
</script>
<style scoped>
    /*其中fontName替换为你的字体名称*/
    @import "~@/assets/css/common/index.less";
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
        background: -webkit-radial-gradient(circle, #d0fbf9,  #7fc7fa); /* Safari 5.1 - 6.0 */
        background: -o-radial-gradient(circle, #d0fbf9,  #7fc7fa); /* Opera 11.6 - 12.0 */
        background: -moz-radial-gradient(circle, #d0fbf9,  #7fc7fa); /* Firefox 3.6 - 15 */
        background: radial-gradient(circle, #d0fbf9,  #7fc7fa); /* 标准的语法 */ 
        padding: 0 32px;
        .page-wrap{
          font-size: 30px;
          color: #fff;
          text-align: right;
          padding: 20px 0 14px;
        }
        .progress-wrap{
          height: 8px;
          /* border: 2px solid #fff;px*/
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          span{
            display: block;
            height: 100%;
            background: #fff;
            transition: width 0.5s ease-out;
            width: 0;
          }
        }
        .question-wrap{
          text-align: center;
          transition: all 0.5s ease;
          min-height: 350px;
          .question-text{
            width: 614px;
            height: 204px;
            border-radius: 14px;
            background: #ffde6b;
            box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
            text-align: center;
            line-height: 1.5;
            font-family: 'cn_en';
            color: #924c36;
            font-size: 48px;
            margin: 120px auto 128px;
            p{
              text-align: left;
              padding: 20px 40px;
            }
          }
          .question-img-audio{
            min-height: 118px;
            border-radius: 14px;
            text-align: center;
            line-height: 1.2;
            font-family: 'cn_en';
            color: #924c36;
            font-size: 48px;
            margin: 26px auto 14px;
            text-align: center;
            p{
              display: inline-block;
              text-align: left;
              padding: 20px 0;
            }
          }
          .img-wrap{
            /* width: 380px; */
            height: 380px;
            /* background: url('~@/assets/img/effect.png') no-repeat;
            background-size: 100% 100%; */
            position: relative;
            border-radius: 18px;
            overflow: hidden;
            margin: 0 auto;
            img.question-img{
              position: absolute;
              height: 366px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
              border-radius: 12px;
            }
          }
          .audio-wrap{
            display: block;
            width: 120px;
            height: 120px;
            box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
            border-radius: 12px;
            margin: 54px auto 0;
            background-color: #ffde6b;
            box-sizing: border-box;
            padding-top: 32px;
            &:active {
              background-color: #ecce64;
            }
            .icon-audio{
              display: block;
              width: 70px;
              height: 54px;
              margin: 0 auto;
            }
          }
        }
        .option-wrap{
          transition: all 0.5s ease;
          margin-top: 60px;
          li{
            text-align: center;
            font-family: 'cn_en';
            font-size: 46px;
            margin-bottom: 30px;
            &:last-of-type{
              margin-bottom: 30px;
            }
            a{
              display: inline-block;
              width: 613px;
              height: 84px;
              line-height: 84px;
              color: #000;
              text-align: center;
              background: url('~@/assets/img/option-bg.png') no-repeat center;
              background-size: 100%;
              &:active{
                background: url('~@/assets/img/answer-bg.png') no-repeat center;
                background-size: 100%;
              }
            }
            a.active{
                background: url('~@/assets/img/answer-bg.png') no-repeat center;
                background-size: 100%;
            }
          }
          
        }
    }
</style>

