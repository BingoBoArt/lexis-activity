<template>
  <div class="bottom-wrapper flex">
    <p class="info">三期语感课报名已经截止</p>
  </div>
</template>

<script>
  /**
   * 参数 loading button_text
   * 事件 click, load
   */

  export default {
    name: 'bottom-component',
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
    },
    created() {
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
.bottom-wrapper{
  width: 100%;
  height: 104px;
  line-height: 104px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: white;
  border-top: 1px solid #9fa0a0;
  .info{
    font-size: 34px;
    color: #ec6143;
    padding-left: 4px;
    text-align: center;
    width: 100%;
  }
}
</style>