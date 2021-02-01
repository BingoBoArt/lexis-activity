<template>
  <div id="app">
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
      
      <!-- <loading></loading> -->
      <!-- <Userinfovue></Userinfovue> -->
  </div>
</template>
<script>
import Tip from '@/components/tip/index.vue'
import Loading from '@/components/loading/index.js'
import Vue from 'vue'

Vue.prototype.$tip = Tip;
Vue.prototype.$loading = Loading;

// import '@/assets/js/common/userinfo.js'
export default {
  name: 'App',
  components: {
    Loading
  },
  created: function () {
    this.$loading.show();
  },
  mounted: function () {
   //require('@/assets/js/common/userinfo.js')
  }
}
</script>
