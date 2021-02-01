<template>
  <div class="wrapper test-wrapper">
    <div class="top"></div>
    <div class="info">
      <div class="infoWrapper">
        <div>每课时25分钟</div>
        <div class="tip">?</div>
      </div>
      <div></div>
    </div>
    <subscribe></subscribe>
  </div>
</template>
<script>
import subscribe from "./Subscribe/subscribe";
import Request from "@/common/request";
export default {
  name: "Login",
  components: {
    subscribe
  },
  data: () => {
    return {};
  },
  methods: {},
  created: function() {},
  components: {
    subscribe
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.top {
  height: 400px;
  background: #e03233;
  margin-bottom: 30px;
}
.info {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  .infoWrapper {
    display: flex;
    width: 650px;
    justify-content: space-between;
  }
}
</style>


