<template>
    <div class="cannot-play-tip">
        <p>为了更好的体验，请在微信中浏览。<br/>网址：http://t.cn/EUJFp99</p>
    </div>
</template>
<script>
  // 安卓且非微信浏览器 会顶层播放
  export default {
    name: 'cannot-play',
    components: {},
    data: () => {
      return {
      }
    },
    props: {
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
    }
  }
</script>
<style scoped type="less">
.cannot-play-tip {
  width: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  background: black;
  text-align: center;
  font-size: 32px;
  color: #fff;
}
</style>

