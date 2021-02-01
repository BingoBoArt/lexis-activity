<template>
    <div class="wrapper sale-pannel">
      <img src="http://file.lexislive.com.cn/static/res/201801/148f2fe8-3e8f-4f8d-ad8a-b689238136a5.jpg"/>
    </div>
</template>
<script>
// import isNeedBind from '../../common/isNeedbind';
export default {
  name: "Sale",
  components: {},
  data: () => {
    return {
      isGot: null
    };
  },
  methods: {},
  created: function() {
    // this.$loading.show();
    // isNeedBind(this);
    // this.$loading.hide();
  },
  mounted: function() {}
};
</script>
<style>
.sale-pannel {
  text-align: center;
  width: 100%;
  height: 100%;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
