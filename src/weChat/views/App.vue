<style>
@import "../assets/css/common/variable.less";
#app {
  .weui-btn_primary {
    background: #3c6be0;
    height: 80px;
    line-height: 80px;
    font-size: @rootFontSize;
    &:active {
      background: #1346c5;
    }
  }
  .weui-btn_primary.btn_yellow {
    background: #f99231;
    &:active {
      background: #b96618;
    }
  }
}
.weui-dialog__bd {
  // text-align: center;
  font-size: 26px;
  display: inline-block;
  margin: auto;
  text-align: justify;
}
.mb-60 {
  margin-bottom: 60px;
}
.weui-toptips_warn {
  background-color: #f99231;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
/*
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(100%);
  opacity: 0;
}
*/
</style>
<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title" img-set="../assets/images/logoTitle.png"></div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>

      <transition name="slide-fade" mode="out-in" appear>
          <router-view v-if="!$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
      </transition>
      
      <!--<loading></loading>-->
      <!-- <Userinfovue></Userinfovue> -->
  </div>
</template>
<script>
import Tip from "@/components/tip/index.vue";
import Loading from "@/components/loading/index.js";
import Vue from "vue";
import VueWechatTitle from "vue-wechat-title";
Vue.prototype.$tip = Tip;
Vue.prototype.$loading = Loading;
Vue.use(VueWechatTitle);
export default {
  name: "App",
  components: {
    Loading
  },
  created: function() {
  },
  mounted: function() {}
};
</script>
