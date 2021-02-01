<template>
    <div class="course-inner" :class="{'fanzhuan': is_turn}">
      <img :src="course_data.zhengmian" class="zhengmian">
      <img :src="course_data.fanmian" class="fanmian">
    </div>
</template>
<script>
  import LemonUtils from 'lemon-utils';
  export default {
    name: 'flash-card',
    components: {},
    data: () => {
      return {
        current_img: "",
        is_turn: false
      }
    },
    props: {
      course_data: {
        type: Object,
        default: {}
      },
      turn_begin: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      turn_begin(newValue, oldValue) {
        console.log("watch turn_begin")
        if(!this.is_turn && newValue){
          this.current_img = this.course_data.fanmian;
          this.is_turn = true;
        }
      }
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
      this.current_img = this.course_data.zhengmian;
    }
  }
</script>
<style scoped type="less">
.course-inner{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(0);
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, 0, 0);
  }
  .zhengmian{
  }
  .fanmian{
    opacity: 0
  }
  &.fanzhuan{
    img.zhengmian{
      animation: rotateRight 1.2s;
      animation-fill-mode: forwards;
    }
    img.fanmian{
      animation: rotateLeft 1.2s;
      animation-fill-mode: forwards;
    }
  }
  @keyframes rotateRight {
      0% { transform: rotateY(0deg); opacity: 1}
      50%   { transform: rotateY(90deg); opacity: 1}
      51%   { transform: rotateY(90deg); opacity: 0}
      100%   { transform: rotateY(90deg); opacity: 0}
  }
  @keyframes rotateLeft {
      0% { transform: rotateY(-180deg); opacity: 0}
      50%   { transform: rotateY(-90deg); opacity: 0}
      51%   { transform: rotateY(-90deg); opacity: 1}
      100%   { transform: rotateY(0deg); opacity: 1}
  }
}
</style>

