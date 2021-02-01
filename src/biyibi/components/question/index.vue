<template>
  <div>
    <div v-if='questionCur.quesTitle' class='question-text'>
      <p :class="{'answer_dec-wrapper': from=='answer_dec'}"><span class="question-index">{{String(quesitonCurIndex).length-1 ? quesitonCurIndex : '0' + quesitonCurIndex}}.</span> <span v-html='replaceBr(questionCur.quesTitle)'></span></p>
      <!-- <p><span v-html='replaceBr(questionCur.quesTitle)'></span></p> -->
    </div>
    <div class='question-wrap'>
      <div v-if='questionType=="1-2"' class='img-wrap'>
        <img class='question-img' :src='questionCur.imageUrl.url' /> 
      </div>
      <a href='javascript:void(0)' v-if='questionType=="1-3"'  :class="audioActive ? 'audio-wrap audio-play' : 'audio-wrap'"  @click = 'audioPlay()'>
        <audio :src="audioSrc" controls="controls" preload :id="'audio'+quesitonCurIndex" hidden></audio>
        <img class='icon-audio' :src='audioActive ? require("@/assets/img/icon-audio.gif") : require("@/assets/img/icon-audio.png")'/>
      </a>
      <p class='text-topic-wrap' v-if="questionType=='1-1' && questionCur.text">
        {{questionCur.text}}
      </p>
      <div class="video-wrap" v-if="questionType=='1-4'">
        <video :key="quesitonCurIndex" :id="'video'+quesitonCurIndex" poster='http://file.lexislive.com.cn/resource/201901/ca2a4290-68bb-4e0b-b659-1b6729379fbf.jpg' controls='controls' width='100%'  style="object-fit:fill;" preload="auto" x-webkit-airplay="true" 
          webkit-playsinline="true" playsinline="true" 
          x5-video-player-fullscreen="false" 
          controlslist="nodownload" :src="questionCur.videoUrl.url">
          您的浏览器环境不支持打开该视频
        </video>
      </div>
    </div>
    <ul class='option-wrap' :style="'opacity:'+ opacity" v-if='question.length>0'>
      <div v-if='questionCur.options[0].text'>
        <li v-for='(item, index) in questionCur.options' :key="index">
          <a :class="{active: item.active, selecteAble: selecteAble, isSelected: item.isSelected}" @click='selecteAble ? (answerQuestion(item,index)) : ""' href='javascript:void(0)'>
            <span :class='{"icon-mark": true,"icon-right": item.isCorrect && !selecteAble, "icon-error": !item.isCorrect && item.isSelected}'></span>
            {{item.item}}. {{item.text}}
          </a>
        </li>
      </div>
      <li class='img-option-wrap' v-else-if='questionCur.options[0].imageUrl'>
        <a v-for='(item, index) in questionCur.options' :key="index" :class="{active: item.active, selecteAble: selecteAble}" @click='selecteAble ? (answerQuestion(item, index)) : ""' href='javascript:void(0)'>
          <span :class='{"icon-mark": true,"icon-right": item.isCorrect && !selecteAble, "icon-error": !item.isCorrect && item.isSelected}'></span>
          <span class='option'>{{item.item}}</span>
          <span :class='{"bg-wrap": true, "selected-bg-wrap": item.isSelected}' ></span>
          <img :src="item.imageUrl" alt=""></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    name: 'question',
    props: {
      from: {
        type: String,
        default: "question"
      },
      questionCur: {
        type: Object,
        required: true
      },
      questionType: {
        type: String,
        required: true
      },
      question: {
        type: Array,
        required: true
      },
      opacity: {
        type: Number,
        required: true
      },
      audioSrc: {
        type: String,
        required: true
      },
      quesitonCurIndex: {
        type: Number,
        required: true
      },
      selecteAble: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    // watch: {
    //   quesitonCurIndex(val) {
    //     // let img = new Image()
    //     // img.src = src;
    //   }
    // },
    data: function(){
        return {
            audioActive: false
        }
    },
    methods: {
      replaceBr(text){
        return text.replace(/\n/g, '<br />');
      },
      audioPlay(){
        let that = this;
        let audio = document.getElementById('audio' + this.quesitonCurIndex);
        audio.currentTime = 0;
        audio.play();
        that.audioActive = true;
        audio.onended = function() {
          that.audioActive = false;
        };
      },
      answerQuestion(item, index) {
        let reqData = {
          isCorrect: item.isCorrect,
          chooseItem: item.item,
          quesId: item.quesId
        }
        this.audioActive = false;
        this.$emit('nextQue', JSON.stringify(reqData), index);
      }
    },
    created(){
    },
    mounted(){
    },
    beforeUpdate() {
    },
    updated(){
    }
}
</script>
<style scoped>
video::-internal-media-controls-download-button {
    display:none;
}
.question-text{
    border-radius: 14px;
    text-align: center;
    line-height: 1.5;
    font-family: 'cn_en';
    color: #111;
    font-size: 42px;
    text-align: left;
    min-height: 50px;
    p{
      display: inline-block;
      text-align: left;
      position: relative;
      padding: 0 30px 0 70px;
    }
    .question-index{
      display: none;
      position: absolute;
      left: 20px;
      top: 0;
    }
    & .answer_dec-wrapper{
      padding: 0 30px 0 90px;
      .question-index{
        display: block;
      }
    }
}
.question-wrap{
  font-family: 'cn_en';
  text-align: left;
  transition: all 0.5s ease;
  min-height: 100px;
  .img-wrap{
    /* width: 380px; */
    height: 486px;
    /* background: url('~@/assets/img/effect.png') no-repeat;
    background-size: 100% 100%; */
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    margin: 46px auto 36px;
    img.question-img{
      position: absolute;
      height: 486px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      border-radius: 10px;
    }
  }
  .audio-wrap{
    display: block;
    width: 120px;
    height: 120px;
    box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 90px auto 80px;
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
  .text-topic-wrap{
    width: 612px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 42px;
    margin: 0 auto;
    background: rgba(255,255,255,0.6);
    margin: 40px auto 60px;
    border-radius: 20px;
  }
  .video-wrap{
    width: 612px;
    height: 346px;
    /* border-radius: 20px; */
    overflow: hidden;
    margin: 50px auto 56px;
    /* background: #000; */
    video{
      width: 100%;
      height: 100%;
    }
  }
}
.option-wrap{
  transition: all 0.5s ease;
  li{
    position: relative;
    font-family: 'cn_en';
    font-size: 42px;
    &:last-of-type{
      /* margin-bottom: 30px; */
    }
    a{
      box-sizing: border-box;
      display: inline-block;
      width: 100%;
      min-height: 100px;
      line-height: 1.5;
      color: #111;
      padding: 18px 70px;
    }
    a.selecteAble{
      &:active{
        background: rgba(20, 140, 196, 0.4);
      }
    }
    a.isSelected{
      background: rgba(20, 140, 196, 0.4);
    }
    &:last-of-type{
      margin-bottom: 40px;
    }
    a.active{
        background: rgba(20, 140, 196, 0.4);
    }
    .icon-mark{
      width: 54px;
      height: 48px;
      position: absolute;
      left: 14px;
      top: 28px;
      z-index: 1;
    }
    .icon-right{
      background: url('~@/assets/img/right.png') no-repeat;
      background-size: 100% 100%;
    }
    .icon-error{
      background: url('~@/assets/img/error.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  li.img-option-wrap{
    padding: 0 97px;
    a:nth-of-type(2n){
      float: right;
    }
    a:nth-of-type(2n-1){
      float: left;;
    }
    a{
      position: relative;
      width: 250px;
      height: 250px;
      box-sizing: border-box;
      text-align: center;
      margin-bottom: 40px;
      padding: 0;
      position: relative;
      img{
        width: 250px;
        height: 250px;
        border-radius: 20px;
      }
      .option{
        position: absolute;
        top: 10px;
        left: 14px;
        /* text-shadow: 0 4px #fff, 4px 0 #fff, -4px 0 #fff, 0 -4px #fff; */
        -webkit-text-stroke: 1px #fff; /*no*/
        /* background: rgba(255,255,255,0.5); */
        width: 55px;
        height: 55px;
        line-height: 50px;
        border-top-left-radius: 20px;
      }
      .bg-wrap{
        width: 250px;
        height: 250px;
        position: absolute;
        top:0;
        left:0;
        transform: scale(1.2);
        /* border-radius: 20px;   */
      }
    }
    a.selecteAble{
    &:active{
        .bg-wrap{
          background: rgba(20, 140, 196, 0.4);
        }
      }
    }
    .selected-bg-wrap{
      background: rgba(20, 140, 196, 0.4);
    }
    a.active{
        background: rgba(20, 140, 196, 0.4);
    }
    .icon-mark{
      top: 50px;
      margin-top: auto;
    }
  }
}
</style>
