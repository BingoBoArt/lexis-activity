
<template>
  <div class="main-wrap">
    <h1>我的课程</h1>
    <p class='tips'>
      暂无课程信息
    </p>
  </div>
</template>
<script>
  export default {
    name: 'example',
    components: {
    },
    data: () => {
      return {
      }
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
    }
  }
</script>
<style scoped>
.main-wrap{
  min-height: 100%;
  background: #fff7ce;
  text-align: center;
  overflow: hidden;
  h1{
    font-size: 44px;
    font-weight: 800;
    margin: 50px auto 10px;
  }
  .tips{
    font-size: 32px;
    color: #ff733b;
    padding: 0 16px;
    line-height: 1.5;
    margin-top: 50px;
  }
}
</style>