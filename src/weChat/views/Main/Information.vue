<template>
    <div class="wrapper infomation-pannel">
      <img src="../../assets/images/information.jpg" alt="">
    </div>
</template>
<script>
import { isNeedBind } from "../../common/util";
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
    this.$loading.show();
    isNeedBind(this);
    this.$loading.hide();
  },
  mounted: function() {}
};
</script>
<style>
.infomation-pannel {
  text-align: center;
  width: 100%;
  height: 100%;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
