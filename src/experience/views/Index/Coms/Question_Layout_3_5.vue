<template>
    <div class="course-inner">
      <div class="course-layout-3">
        <h2 class="flex">{{course_data.story.title}}</h2>
        <div class="img-wrapper">
          <img :src="course_data.story.img">
          <img src="~@/assets/images/game/effect.png" class="mask">
        </div>
      </div>
      <div class="course-layout-5">
        <h2 class="flex main-title">{{course_data.question.title}}</h2>
        <p class="question-title">{{course_data.question.question_title}}</p>
        <ul class="option-list text-option-list">
          <li class="option-item flex" v-for="(item, index) in course_data.question.option" :key="index" @click.stop="handleAnswer(index)"  :class="{'option-item-right': is_answer && item.right == 1, 'option-item-error': is_answer && item.right == 0 && answer_index == index}">
              <span class="letter">{{letters[index]}}</span>
              <span class="text">{{item.text}}</span>
              <template v-if="is_answer && item.right == 1">
                <img src="~@/assets/images/game/right.png" class="tip-img">
              </template>
              <template v-if="is_answer && item.right == 0 && answer_index == index">
                <img src="~@/assets/images/game/error.png" class="tip-img">
              </template>
          </li>
          <p v-if="!tip_show && course_data.question.isVoice && !this.countdown.begin" class="op-tip-voice">请下载 “英语天天见” APP<br/>体验语音答题</p>
          <p v-if="tip_show" class="op-tip">请点击选项</p>
        </ul>
        <Timer :key="course_data.index" @over="onOver" :begin="countdown.begin"></Timer>
      </div>
    </div>
</template>
<script>
  import LemonUtils from 'lemon-utils';
  import ComUtil from '@/common/util.js'
  import Timer from '@/components/Timer.vue'
  export default {
    name: 'question-layout-3-5-card',
    components: {
      Timer
    },
    data: () => {
      return {
        tip_show: false,
        is_answer: false,
        answer_index: -1,
        letters: ['A', 'B', 'C', 'D'],
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
        this.countdown.over = false;
        this.is_answer = false;
        this.answer_index = -1;
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
    computed: {
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
        let option = this.course_data.question.option[index];
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
    updated() {
      // console.log("layout_3_5 updated")
    },
    created: function () {
    },
    mounted: function () {
      // console.log("layout_3_5 mounted")
    }
  }
</script>
<style scoped type="less">
@import "~@/assets/css/common/variable.less";
</style>

