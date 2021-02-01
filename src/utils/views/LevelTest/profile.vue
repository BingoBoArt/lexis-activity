<template>
    <div class="start-wrap">
      <img class="level" src="~@/assets/img/ttj.jpg" alt="">
      <img class="start-title" src='~@/assets/img/level-title.png'>
      <div class="start-content">
            <p class="start-content-top">为了帮助您更好地选择课程，请您监督孩子独立完成本次测试。为了保证测试结果更加准确，请建议您的孩子不要猜测答案、或在答题期间使用词典等辅助工具。</p>  
            <p class="start-content-bottom">测评结果仅供参考，您也可以安排孩子先试听不同等级课程后，根据实际情况再选择最合适的等级。</p>
      </div>
      <a class="start" href='javascript:void(0)' @click='questionStart()'></a>
      <div class='bot-wrap'></div>
    </div>
</template>
<script>
import Request from "@/common/request.js";
import AppHandle from "@/common/appHandle.js";
import Events from "@/common/events.js";
import Tip from "@/components/tip/index.js";
export default {
  name: "GetVip",
  components: {},
  data: () => {
    return {};
  },
  methods: {
    goBack() {
      AppHandle().toHome();
    },
    questionStart() {
      this.$router.replace({ path: "LevelQuestion" });
    }
  },
  created: function() {},
  mounted: function() {
    this.$loading.hide();
  }
};
</script>
<style scoped>
@import "~@/assets/css/common/index.less";
* {
  /* touch-action: none; */
}
.start-wrap {
  -webkit-user-select: none;
  width: 100%;
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  /* overflow: hidden; */
  background: -webkit-radial-gradient(
    circle,
    #d0fbf9,
    #7fc7fa
  ); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(
    circle,
    #d0fbf9,
    #7fc7fa
  ); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(
    circle,
    #d0fbf9,
    #7fc7fa
  ); /* Firefox 3.6 - 15 */
  background: radial-gradient(circle, #d0fbf9, #7fc7fa); /* 标准的语法 */
  padding: 50px 0 20px;
}
.bot-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 662px;
  background: url("~@/assets/img/animals.png") no-repeat;
  background-size: 100% 100%;
}
.start-title {
  display: block;
  width: 298px;
  height: 70px;
  margin: 16px auto 0;
}
.level {
  width: 190px;
  height: 125px;
  margin: 0 auto;
  display: block;
}
div.start-content {
  width: 680px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  margin: 30px auto 0;
  padding: 30px 15px;
  font-size: 32px;
  line-height: 54px;
  text-indent: 2em;
  color: #418cc8;
  position: relative;
  z-index: 2;
}
.start-content-top {
  margin-bottom: 30px;
}
.start {
  width: 325px;
  height: 115px;
  display: block;
  margin: 114px auto 0;
  background: url("~@/assets/img/btn-start.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  z-index: 2;
}
</style>

