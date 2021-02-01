<template>
    <lemon-button  :class='{"btn": true, "green": color == "green"}' type="primary" @click='handleClickEnv'>
      <span class='left'></span>
      <slot></slot>
      <span class='right'></span>
    </lemon-button>
</template>
<style scoped>
.btn{
    width: 508px;
    height: 100%;
    background:  url(./img/btn-line.png) repeat-x;
    background-size: auto 100%;
    position: relative;
    border: 7px solid #fff;
    border-radius: 20px;
    margin: 20px auto 0;
    display: block;
    line-height: 1;
    span.left{
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width:20px;
      height: 100%;
      background:  url(./img/btn-left.png) no-repeat left top;
      background-size: 100% 100%;
    }
    span.right{
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      width:20px;
      height: 100%;
      background: url(./img/btn-right.png) no-repeat right top;
      background-size: 100% 100%;
    }
}
.green{
  background:  url(./img/icon-g-line.png) repeat-x;
  background-size: auto 100%;
  span.left{
    background: url(./img/icon-g-left.png) no-repeat left top;
    background-size: 100% 100%;
  }
  span.right{
    background: url(./img/icon-g-right.png) no-repeat left top;
    background-size: 100% 100%;
  }
}
</style>
<script>
export default {
  name: 'button-basic',
  methods: {
    handleClickEnv(arg) {
      this.$emit('click', arg);
    }
  },
  props: {
    color: String
  }
}
</script>
