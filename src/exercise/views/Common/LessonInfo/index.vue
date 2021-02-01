<template>
  <div class='lesson-desc-wrap'>
    <div class='tips' v-if='lessonDesc.tips'>您已经成功报名了以下课程：</div>
    <div class='title' v-html='lessonDesc.title'></div>
    <div class='centent' v-html="lessonDesc.content"></div>
    <a href = 'javascript:void(0);' v-if='!lessonDesc.first' class='btn-route' @click='toIndex'>课程详情</a>    
  </div>
</template>
<script>
  export default {
    name: 'bottom-component',
    data() {
        return {
        }
    },
    props: {
      lessonDesc: {
        type: Object
      }
    },
    watch: {
    },
    methods: {
      toIndex() {
        this.$router.push({path: '/Index', query: {_origin: 'orderList'}})
        // let replaceUrl = location.href.split("?")[0] +
        //       "?_from=orderList" +
        //       "#/Index";
        //     window.location.href = replaceUrl;
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less" scoped>
 .lesson-desc-wrap{
    background: #fff;
    padding: 20px;
    margin-bottom: 18px;
    position: relative;
    min-height: 200px;
    .tips{
      font-size: 40px;
      color: #ff733b;
      margin-bottom: 12px;
    }
    div.title{
      font-size: 44px;
      font-weight: 800;
      margin-bottom: 10px;
    }
    div.centent{
      font-size: 30px;
      line-height: 50px;
      color: #898989;
    }
    .btn-route{
      // displa
      position: absolute;
      right: 0;
      bottom: 0;
      width: 210px;
      height: 86px;
      line-height: 86px;
      color: #fff;
      font-size: 40px;
      background: #ff561a;
      text-align: center;
      &:active{
        opacity: 0.8;
      }
    }
  }
</style>