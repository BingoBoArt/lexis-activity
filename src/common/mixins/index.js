import Vue from 'vue'
// 定义一个混合对象
var mixin = {
  /*
  beforeRouteLeave(to, from, next) {
    // 页面离开时 关闭页面loading
    // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB
    try{
      this.$loadingCloseAll();
    }catch(e){
    }
    next();
  },
  */
  methods: {
  }
}
Vue.mixin(mixin)