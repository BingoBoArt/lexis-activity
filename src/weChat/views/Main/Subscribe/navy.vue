<template>
  <ul class="navY">
    <li v-for='(item,index) in timetable' :key='index'>{{item}}</li>
  </ul>
</template>
<script>
export default {
  name: "navy",
  data: () => {
    return {
      timetable: []
    };
  },
  methods: {},
  created: function() {
    //初始化数组
    for (let a = 0; a < 8; a++) {
      this.timetable[a] = "-- : --";
    }
  },
  mounted: function() {},
  components: {}
};
</script>
<style lang="less" scoped>
.navY {
  float: left;
}
</style>
