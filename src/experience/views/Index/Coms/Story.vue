<template>
    <div class="course-inner course-layout-3">
      <h2 class="flex">{{course_data.title}}</h2>
      <div class="img-wrapper">
        <img :src="course_data.img">
        <img src="~@/assets/images/game/effect.png" class="mask">
      </div>
    </div>
</template>
<script>
  import LemonUtils from 'lemon-utils';
  export default {
    name: 'story-card',
    components: {},
    data: () => {
      return {
      }
    },
    props: {
      course_data: {
        type: Object,
        default: {}
      }
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
      console.log("story mounted")
    }
  }
</script>
<style scoped type="less">
</style>

