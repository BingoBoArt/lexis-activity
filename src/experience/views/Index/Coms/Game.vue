<template>
    <div class="course-inner  course-layout-game">
      <h2 class="flex main-title">{{course_data.title}}</h2>
      <!-- <p class="flex question-title">{{course_data.question_title}}</p> -->
      <ul class="option-list flex">
        <li class="option-item" v-for="(item, index) in course_data.option" :key="index" @click.stop="handleAnswer(index)">
          <img :src="item.img">
          <img src="~@/assets/images/game/effect.png" class="mask">
          <template v-if="is_answer && item.right == 1">
            <img src="~@/assets/images/game/effect_right.png" class="mask">
            <img src="~@/assets/images/game/right.png" class="tip-img">
          </template>
          <template v-if="is_answer && item.right == 0 && answer_index == index">
            <img src="~@/assets/images/game/effect_error.png" class="mask">
            <img src="~@/assets/images/game/error.png" class="tip-img">
          </template>
        </li>
      </ul>
      <p v-if="tip_show" class="op-tip">请点击图片</p>
      <Timer :key="course_data.index" @over="onOver" :begin="countdown.begin"></Timer>
    </div>
</template>
<script>
  import LemonUtils from 'lemon-utils';
  import ComUtil from '@/common/util.js'
  import Timer from '@/components/Timer.vue'
  export default {
    name: 'game-card',
    components: {
      Timer
    },
    data: () => {
      return {
        tip_show: false,
        is_answer: false,
        answer_index: -1,
        countdown: {
          begin: false,
          over: false
        }
      }
    },
    props: {
      course_data: {
        type: Object,
        default: {}
      },
      countdown_begin: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      course_data(newValue, oldValue) {
      },
      countdown_begin(newValue, oldValue) {
        console.log("watch countdown_begin", newValue)
        if(!this.countdown.begin && newValue){
          this.tip_show = true;
          setTimeout(() => {
            this.countdown.begin = true;
            this.tip_show = false;
            this.$emit("countdown");
          }, 2000)
        }
      }
    },
    methods: {
      onOver() {
        if(!this.countdown.over){
          // this.countdown.begin = false;
          this.countdown.over = true;
          this.$emit("over")
          setTimeout(() => {
            this.countdown.begin = false;
          }, 3000)
        }
      },
      handleAnswer(index) {
        if(this.is_answer || this.countdown.over || !this.countdown.begin){
          return;
        }
        let option = this.course_data.option[index];
        this.is_answer = true;
        this.answer_index = index;
        if(option.right == 1){
          // 答对 播放声音？
          ComUtil.soundPlay("right_mp3")
        }else{
          // 答错
          ComUtil.soundPlay("error_mp3")
        }
        this.onOver();
      }
    },
    created: function () {
    },
    mounted: function () {
    }
  }
</script>
<style scoped type="less">
@import "~@/assets/css/common/variable.less";
@width: 1860;
@height: 890;
.course-inner{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(~@/assets/images/game/bg.png) left top no-repeat;
  background-size: contain;
  .main-title{
    color: #000000;
    .size_width(998);
    .size_height(120);
    margin: 1.4% auto 0;
    background: url(~@/assets/images/game/title_2.png) left top no-repeat;
    background-size: 100% 100%;
    font-size: 16px;
    align-items: center;
    justify-content: center;
  }
  .question-title{
    .size_width(600);
    .size_height(120);
    font-size: 14px;
    color: #6b3e7a;
    background: url(~@/assets/images/game/question_title_bg.png) left top no-repeat;
    background-size: 100% 100%;
    margin: 1% auto;
    align-items: center;
    justify-content: center;
    /* -webkit-text-stroke: 1px white; */
  }
  .option-list{
    width: 100%;
    margin-top: 6%;
    .size_height(388);
    justify-content: center;
    position: relative;
    overflow: hidden;
    .option-item{
      .size_width(388);
      height: 100%;
      margin: 0 1%;
      flex: 0 1 auto; /*默认属性 flex-grow、flex-shrink、flex-basis组合*/
      border-radius: 6%;
      position: relative; 
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
      .mask{
        position: absolute;
        left: 0;
        top: 0;
      }

      .tip-img{
        position: absolute;
        width: 20%;
        height: 20%;
        top: 5%;
        right: 5%;
      }
    }
  }

  .countdown{
    .size_width(240);
    .size_height(120);
  }
}
</style>

