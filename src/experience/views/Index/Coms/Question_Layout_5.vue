<template>
    <div class="course-inner  course-layout-5">
      <h2 class="flex main-title">{{course_data.title}}</h2>
      <p class="question-title">{{course_data.question_title}}</p>
      <ul class="option-list flex">
        <li class="option-item" v-for="(item, index) in course_data.option" :key="index" @click.stop="handleAnswer(index)">
          <img :src="item.img">
          <img v-if="!is_answer || answer_index != index" src="~@/assets/images/game/effect.png" class="mask">
          <template v-if="is_answer && item.right == 1 && answer_index == index">
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
    name: 'question-layout-3-card',
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
      console.log("countdown_begin", this.countdown_begin)
    }
  }
</script>
<style scoped type="less">
.course-layout-5{
  left: 0;
}
</style>

