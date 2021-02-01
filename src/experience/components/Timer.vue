<template>
    <lemon-countdown class="countdown" :begin="begin" :seconds="10" formate="ss" @over="onOver">
      <img v-if="isOver || !begin" src="~@/assets/images/game/timer_static.png" class="timer-pic">
      <img v-else src="~@/assets/images/game/timer.gif" class="timer-pic">
    </lemon-countdown>
</template>
<script>
  export default {
    name: 'timer',
    components: {},
    data: () => {
      return {
        isOver: false
      }
    },
    props: {
      begin: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onOver() {
        this.isOver = true;
        this.$emit("over")
      }
    },
    created: function () {
    },
    mounted: function () {
    }
  }
</script>
<style scoped type="less">
</style>

