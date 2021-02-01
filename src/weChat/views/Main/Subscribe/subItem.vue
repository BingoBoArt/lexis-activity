<template>
  <div class="wrapper">
    <!-- 可预约 -->
    <div class='ableOrder' v-if='itemInfo.flag == 0'>
      <div class="time">{{itemInfo.time}}</div>
      <div class="order">预约</div>
    </div>
    <!-- 约满 -->
    <div class='disabledOrder' v-if='itemInfo.flag == 4'>
      <div>约满</div>
    </div>
    <!-- 已约 -->
    <div class='ableOrder hasOrder' v-if='itemInfo.flag == 2'>
      <div>已约</div>
      <div class="time">{{itemInfo.time}}</div>
    </div>
    <!-- 匹配高亮item -->
    <div class='ableOrder' v-if='itemInfo.flag == 3'>
      <div class="time">{{itemInfo.time}}</div>
      <div class="order">预约</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SubItem",
  props: ["itemInfo"],
  data: () => {
    return {};
  },
  methods: {},
  created: function() {},
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 90px;
  height: 70px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  margin-top: 7px;
  .ableOrder {
    border: 1px solid #d2edef;
    border-radius: 15px;
    width: 80px;
    height: 65px;
    &.disabledOrder {
      width: 80px;
      text-align: center;
      height: 65px;
    }
    div {
      width: 70px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      display: inline-block;
    }
    .time {
      font-size: 27px;
    }
    .order {
      margin: 0 auto;
      border-radius: 12px;
      background: #00c8a2;
      color: white;
    }
  }
  .disabledOrder {
    font-size: 35px;
    > div {
      line-height: 65px;
      color: #09ddb6;
    }
  }
  .hasOrder{
    div {
      color: white;
    }
    border: none;
    background: #f55c6e;
  }
}
</style>
