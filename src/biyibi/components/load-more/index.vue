<template>
    <div class="load-more-wrapper">
      <a href="javascript:void(0);" @click="loadMore" :class="{'no-more': !hasMore}">{{button_text}}</a>
    </div>
</template>
<script>
import Request from "@base/common/request.js";
export default {
  name: "more",
  components: {},
  data: () => {
    return {
      has_left: true,
      test_data: []
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    button_text() {
      return this.hasMore ? (this.loading ? '正在加载更多...' : '点击加载更多') : "已无更多"
    }
  },
  methods: {
    loadMore() {
      this.$emit("load")
    },
    getList() {
      Request(this.loadOpt).then(res => {
        if(res && res.code == "0000" && res.data){
          this.has_left = res.data[this.loadOpt.leftKey];
          this.$emit("more", res.data[this.loadOpt.listKey])
        }else{
          this.$toast(res.msg || "系统错误，请稍后重试！")
        }
      }).always(res => {
        this.loading = false;
      })
    }
  },
  created: function() {},
  mounted: function() {
  }
};
</script>
<style scoped>
.load-more-wrapper {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  a{
    display: block;
    width: 100%;
    height: 100%;
    color: #111;

    &.no-more{
      color: #777;
    }
  }
}
</style>

