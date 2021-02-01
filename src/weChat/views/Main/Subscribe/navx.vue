<template>
  <div class="wrapper">
    <ul class="navX">
      <li v-for="(item,index) in listY" :key='index' class="navxItem">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "navx",
  data: () => {
    return {
      listY: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    };
  },
  methods: {},
  created: function() {},
  mounted: function() {},
  components: {}
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  .navX {
    overflow: hidden;
    .navxItem {
      float: left;
      background: #034b47;
      color: white;
      height: 75px;
      width: 90px;
      font-size: 28px;
      text-align: center;
      line-height: 75px;
    }
  }
}
</style>
